import * as schema from "./schema";
import { env } from "$env/dynamic/private";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

// Create database
const turso = createClient({
  url: env.TURSO_DATABASE_URL ?? "file:development.sqlite",
  authToken: env.TURSO_AUTH_TOKEN,
});
export const db = drizzle(turso, { schema });
await migrate(db, { migrationsFolder: "migrations" })

// Type
export type Database = typeof db;
