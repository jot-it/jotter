import { redirect } from "next/navigation";

async function Home() {
  redirect("/notes");
}

export default Home;
