import { Editor } from "@/components/Editor";

export const dynamic = "force-dynamic";

async function NotePage({ params }: { params: { noteId: string } }) {
  return <Editor collaboration={{ documentId: params.noteId }} />;
}

export default NotePage;
