import type { Config } from "drizzle-kit";

export default {
  dialect: "turso",
  out: "./migrations",
  schema: "./src/lib/schema.ts",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL ?? "file:development.sqlite",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
