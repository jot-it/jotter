import { getDocumentByName } from "@/actions/document";
import { getToken } from "@/actions/token";
import { Editor } from "@/components/Editor";
import { notFound } from "next/navigation";

async function NotePage({ params }: { params: { noteId: string } }) {
  const [doc, token] = await Promise.all([
    getDocumentByName(params.noteId),
    getToken([]),
  ]);

  if (!doc || !token) {
    notFound();
  }

  return <Editor documentId={params.noteId} accessToken={token} />;
}

export default NotePage;
