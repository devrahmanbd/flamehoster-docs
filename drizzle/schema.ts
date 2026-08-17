import { mysqlTable, int, varchar, text, mysqlEnum, timestamp } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const assistantFeedback = mysqlTable("assistantFeedback", {
  id: int("id").autoincrement().primaryKey(),
  edition: varchar("edition", { length: 32 }).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  rating: mysqlEnum("rating", ["helpful", "unhelpful"]).notNull(),
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AssistantFeedback = typeof assistantFeedback.$inferSelect;
export type InsertAssistantFeedback = typeof assistantFeedback.$inferInsert;

export const unansweredQuestions = mysqlTable("unansweredQuestions", {
  id: int("id").autoincrement().primaryKey(),
  edition: varchar("edition", { length: 32 }).notNull(),
  question: text("question").notNull(),
  reason: varchar("reason", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UnansweredQuestion = typeof unansweredQuestions.$inferSelect;
export type InsertUnansweredQuestion = typeof unansweredQuestions.$inferInsert;
