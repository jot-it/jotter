import { getDocumentByName } from "@/actions/document";
import { Editor } from "@/components/Editor";
import authOptions from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function NotePage({ params }: { params: { noteId: string } }) {
  const [session, doc] = await Promise.all([
    getServerSession(authOptions),
    getDocumentByName(params.noteId),
  ]);

  if (!session || !doc) {
    notFound();
  }

  return <Editor documentId={params.noteId} />;
}

export default NotePage;
