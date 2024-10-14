import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const postTable = sqliteTable("post", {
    id: integer("id").primaryKey(),
    title: text("name").notNull(),
    body: text("body").notNull(),
});
