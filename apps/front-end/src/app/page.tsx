import { createNotebook, getNotebook } from "@/actions/document";
import { redirect } from "next/navigation";

async function Home() {
  let notebook = await getNotebook();
  if (!notebook) {
    notebook = await createNotebook();
  }

  redirect(`/${notebook.id}`);
}

export default Home;
