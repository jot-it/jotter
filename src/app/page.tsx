import Paper from "../components/Paper";
import Header from "./Header";
import SideNavigation from "./SideNavigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MD editor",
  description: "Markdown editor",
};

export default function Home() {
  return (
    <>
      <div className="grid min-h-screen grid-cols-[1fr_3fr]">
        <SideNavigation />
        <main>
          <Header />
          <Paper />
        </main>
      </div>
    </>
  );
}
