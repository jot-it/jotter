import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  blob,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email"),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId").notNull(),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId").notNull(),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({
      columns: [vt.identifier, vt.token],
    }),
  }),
);

export const documents = sqliteTable("document", {
  name: text("name").primaryKey(),
  createdOn: integer("createdOn", { mode: "timestamp_ms" }),
  modifiedOn: integer("modifiedOn", { mode: "timestamp_ms" }),
  data: blob("data"),
  notebookId: text("id").notNull(),
});

export const notebooks = sqliteTable("notebook", {
  id: text("id").notNull().primaryKey(),
  authorId: text("authorId").notNull(),
});

export const notebookDocuments = sqliteTable("notebook_document", {
  notebookId: text("notebookId").notNull().primaryKey(),
  documentName: text("documentName").notNull(),
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
