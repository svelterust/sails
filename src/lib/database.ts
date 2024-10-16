import * as schema from "./schema";
import { env } from "$env/dynamic/private";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

// Create database
const turso = createClient({
  url: env.TURSO_DATABASE_URL ?? "file:development.sqlite",
  authToken: env.TURSO_AUTH_TOKEN,
  syncUrl: env.TURSO_SYNC_URL,
  syncInterval: env.TURSO_SYNC_URL ? 300 : undefined,
});
export const db = drizzle(turso, { schema });

// Only run migrations when using Bun, Cloudflare Pages doesn't support this
if (typeof Bun !== "undefined") {
  await migrate(db, { migrationsFolder: "migrations" });
}

// Type
export type Database = typeof db;
