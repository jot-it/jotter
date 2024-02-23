import { createNotebook, getNotebook } from "@/actions/document";
import { redirect } from "next/navigation";

async function Home() {
  let notebook = await getNotebook();
  if (!notebook) {
    // somehow the user doesn't have a notebook yet
    notebook = await createNotebook();
  }

  redirect(`/${notebook.id}`);
}

export default Home;
