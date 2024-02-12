"use server";
import authOptions from "@/config/auth-options";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { Doc, encodeStateAsUpdate } from "yjs";

async function createDocument() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
  const ydoc = new Doc();
  const encoded = encodeStateAsUpdate(ydoc);

  const result = await prisma.documents.create({
    data: {
      modifiedOn: new Date(),
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

  await prisma.documents.delete({
    where: {
      name: docName,
    },
  });
}

export { createDocument, deleteDocument };
