"use server";
import authOptions from "@/config/auth-options";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { Doc, encodeStateAsUpdate } from "yjs";

const DOCUMENT_TYPE = {
  NOTE: "note",
  NOTEBOOK: "notebook",
} as const;

type DocumentType = ObjectValues<typeof DOCUMENT_TYPE>;

async function createDocument(docType: DocumentType) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const ydoc = new Doc();
  const encoded = encodeStateAsUpdate(ydoc);

  const result = await prisma.document.create({
    data: {
      type: docType,
      data: Buffer.from(encoded),
      author: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return { name: result.name };
}

async function deleteDocument(docName: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.document.delete({
    where: {
      name: docName,
    },
  });
}

async function getDocumentByName(docName: string) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  return prisma.document.findUnique({
    where: {
      name: docName,
    },
  });
}

async function createNotebook() {
  const doc = await createDocument("notebook");
  return { name: doc.name };
}

async function createNote() {
  const doc = await createDocument("note");
  return { name: doc.name };
}

async function getNotebook() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  return prisma.document.findFirst({
    select: {
      name: true,
      author: true,
    },
    where: {
      type: DOCUMENT_TYPE.NOTEBOOK,
      author: {
        id: session.user.id,
      },
    },
  });
}

export {
  createDocument,
  deleteDocument,
  getDocumentByName,
  createNote,
  createNotebook,
  getNotebook,
};
