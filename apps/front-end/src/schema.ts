import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  char,
  customType,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

const blob = customType<{ data: Buffer }>({
  dataType() {
    return "blob";
  },
});

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
});

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({
      columns: [vt.identifier, vt.token],
    }),
  }),
);

export const documents = mysqlTable("document", {
  name: char("name", { length: 21 }).primaryKey(),
  createdOn: timestamp("createdOn", { mode: "date" }).defaultNow(),
  modifiedOn: timestamp("modifiedOn", { mode: "date" }).defaultNow(),
  data: blob("data"),
  notebookId: char("id", { length: 21 }).notNull(),
});

export const notebooks = mysqlTable("notebook", {
  id: char("id", { length: 21 }).notNull().primaryKey(),
  authorId: varchar("authorId", { length: 255 }).notNull(),
});

export const notebookDocuments = mysqlTable("notebook_document", {
  notebookId: char("notebookId", { length: 21 }).notNull().primaryKey(),
  documentName: char("documentName", { length: 21 }).notNull(),
});

/******************************************************************************
 *                              TABLE RELATIONS
 * ***************************************************************************/

export const usersRelations = relations(users, ({ one }) => {
  return {
    notebook: one(notebooks),
    // accounts: one(accounts),
    // sessions: many(sessions),
  };
});

export const notebooksRelations = relations(notebooks, ({ one, many }) => {
  return {
    author: one(users, {
      fields: [notebooks.authorId],
      references: [users.id],
    }),
    document: one(notebookDocuments, {
      fields: [notebooks.id],
      references: [notebookDocuments.notebookId],
    }),
    notes: many(documents),
  };
});

export const documentRelations = relations(documents, ({ one }) => {
  return {
    notebook: one(notebooks, {
      fields: [documents.notebookId],
      references: [notebooks.id],
    }),
  };
});
