"use server";
import authOptions from "@/config/auth-options";
import db from "@/lib/db";
import { documentNotebook, documents, notebooks } from "@/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";

async function createDocument() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const name = nanoid();

  db.transaction(async (tx) => {
    await tx.insert(documents).values({ name });
    const [notebook] = await tx
      .select()
      .from(notebooks)
      .where(eq(notebooks.authorId, session.user.id));

    await tx.insert(documentNotebook).values({
      documentName: name,
      notebookId: notebook.id,
    });
  });

  return { name };
}

async function deleteDocument(docName: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.delete(documents).where(eq(documents.name, docName));
}

async function getDocumentByName(docName: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const [doc] = await db
    .select()
    .from(documents)
    .where(eq(documents.name, docName));

  return doc;
}

async function createNotebook() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  db.transaction(async (tx) => {
    const name = nanoid();
    await tx.insert(documents).values({ name });

    const [res] = await tx.insert(notebooks).values({
      documentName: name,
      authorId: session.user.id,
    });

    await tx.insert(documentNotebook).values({
      notebookId: res.insertId,
      documentName: name,
    });
  });
}

async function createNote() {
  return createDocument();
}

async function getNotebook() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return db
    .select()
    .from(notebooks)
    .where(eq(notebooks.authorId, session.user.id));
}

async function getNotebookByDocumentName(documentName: string) {
  const result = await db
    .select()
    .from(notebooks)
    .innerJoin(
      documentNotebook,
      eq(documentNotebook.documentName, documentName),
    );

  if (result.length > 0) {
    return result[0].notebook;
  }

  return null;
}

export {
  createDocument,
  createNote,
  createNotebook,
  deleteDocument,
  getDocumentByName,
  getNotebookByDocumentName,
};
