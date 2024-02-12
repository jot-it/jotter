import { Editor } from "@/components/Editor";
import authOptions from "@/config/auth-options";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function NotePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Overkill middleware guarantees that there is a session at this point
    notFound();
  }
  const user = session.user;

  const documentId = `${user.id}.${params.id}`;
  return <Editor documentId={documentId} />;
}

export default NotePage;
