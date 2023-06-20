import { Metadata } from "next";
import Editor from "./note/[id]/page";

export const metadata: Metadata = {
  title: "MD editor",
  description: "Markdown editor",
};

export default function Home() {
  // TODO: Design starting page when no notebook is open
  return <Editor />;
}
