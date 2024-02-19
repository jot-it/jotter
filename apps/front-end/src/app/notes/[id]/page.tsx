import { getNotebookByDocumentName } from "@/actions/document";
import { Editor } from "@/components/Editor";
import authOptions from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function NotePage({ params }: { params: { id: string } }) {
  const [session, notebook] = await Promise.all([
    getServerSession(authOptions),
    getNotebookByDocumentName(params.id),
  ]);

  if (!session || !notebook) {
    notFound();
  }

  return <Editor documentId={params.id} />;
}

export default NotePage;
