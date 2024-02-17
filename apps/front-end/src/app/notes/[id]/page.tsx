import { getDocumentByName } from "@/actions/document";
import { Editor } from "@/components/Editor";
import authOptions from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function NotePage({ params }: { params: { id: string } }) {
  const [session, documentExist] = await Promise.all([
    getServerSession(authOptions),
    getDocumentByName(params.id),
  ]);

  if (!session || !documentExist) {
    notFound();
  }

  return <Editor documentId={params.id} />;
}

export default NotePage;
