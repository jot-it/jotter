"use server";
import authOptions from "@/config/auth-options";
import db from "@/lib/db";
import { documents, notebookDocuments, notebooks } from "@/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";

async function createDocument(notebookId: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const name = nanoid();
  await db.insert(documents).values({ name, notebookId });
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

  return db.query.documents.findFirst({
    where: eq(documents.name, docName),
  });
}

async function createNotebook() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  return db.transaction(async (tx) => {
    const documentName = nanoid();
    const notebookId = nanoid();
    await Promise.all([
      tx.insert(documents).values({ name: documentName, notebookId }),
      tx.insert(notebooks).values({
        id: notebookId,
        authorId: session.user.id,
      }),
      tx.insert(notebookDocuments).values({ notebookId, documentName }),
    ]);

    return {
      id: notebookId,
      documentName: documentName,
      authorId: session.user.id,
    };
  });
}

async function getNotebook() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  return db.query.notebooks.findFirst({
    where: eq(notebooks.authorId, session.user.id),
  });
}

async function getNotebookById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  return db.query.notebooks.findFirst({
    with: { document: true },
    where: eq(notebooks.id, id),
  });
}

export {
  createDocument,
  createNotebook,
  deleteDocument,
  getDocumentByName,
  getNotebook,
  getNotebookById,
};
