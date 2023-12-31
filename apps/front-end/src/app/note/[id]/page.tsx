import fs from "fs/promises";
import path from "path";
import Editor from "./Editor";

async function NotePage({ params }: { params: { id: string } }) {
  const gettingStartedTutorial = await fs.readFile(
    path.join(process.cwd(), "src", "content", "getting-started.md"),
    "utf-8",
  );
  return (
    <Editor
      collaboration={true}
      documentId={params.id}
      initialMarkdown={gettingStartedTutorial}
    />
  );
}

export default NotePage;
