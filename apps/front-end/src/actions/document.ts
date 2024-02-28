"use server";
import authOptions from "@/config/auth-options";
import db from "@/lib/db";
import { documents, notebooks } from "@/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";

async function createDocument() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const name = nanoid();
  await db.insert(documents).values({ name });

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

  const res = await db
    .select()
    .from(documents)
    .where(eq(documents.name, docName));

  return res.length ? res[0] : null;
}

async function createNotebook() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  return db.transaction(async (tx) => {
    const name = nanoid();
    await tx.insert(documents).values({ name });

    const [res] = await tx.insert(notebooks).values({
      documentName: name,
      authorId: session.user.id,
    });

    return {
      id: res.insertId,
      documentName: name,
      authorId: session.user.id,
    };
  });
}

async function getNotebook() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const result = await db
    .select()
    .from(notebooks)
    .where(eq(notebooks.authorId, session.user.id));

  if (result.length > 0) {
    return result[0];
  }

  return null;
}

async function getNotebookById(id: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const res = await db.select().from(notebooks).where(eq(notebooks.id, id));
  return res.length ? res[0] : null;
}

export {
  createDocument,
  createNotebook,
  deleteDocument,
  getDocumentByName,
  getNotebook,
  getNotebookById,
};
