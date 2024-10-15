import { db } from "./db";
import { eq } from "drizzle-orm";
import { type User, type Session, sessionTable, userTable } from "./schema";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";

function getSessionId(token: string): string {
  const bytes = new Uint8Array(32);
  Bun.SHA256.hash(token, bytes);
  return encodeHexLowerCase(bytes);
}

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
}

export async function createSession(token: string, userId: number): Promise<Session> {
  // Create session and insert into database
  const sessionId = getSessionId(token);
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  };
  await db.insert(sessionTable).values(session);
  return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  // Check if session exists
  const sessionId = getSessionId(token);
  const result = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));
  if (result.length < 1) return { session: null, user: null };
  const { user, session } = result[0];

  // If session has expired, delete it
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }

  // Extend session if it's recent
  const day = 1000 * 60 * 60 * 24;
  if (Date.now() >= session.expiresAt.getTime() - day * 14) {
    session.expiresAt = new Date(Date.now() + day * 28);
    await db
      .update(sessionTable)
      .set({
        expiresAt: session.expiresAt
      })
      .where(eq(sessionTable.id, session.id));
  }
  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
