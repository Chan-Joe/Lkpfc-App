import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const apps = pgTable("apps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  iconUrl: text("icon_url").notNull(),
  version: text("version"),
  installed: boolean("installed").notNull().default(false),
  isLatest: boolean("is_latest").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertAppSchema = createInsertSchema(apps).omit({
  id: true,
  createdAt: true,
});

export type InsertApp = z.infer<typeof insertAppSchema>;
export type App = typeof apps.$inferSelect;
