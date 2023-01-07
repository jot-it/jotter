import Head from "next/head";
import { ComponentPropsWithoutRef } from "react";
import DocumentHeader from "../DocumentHeader";

function Layout({ children }: ComponentPropsWithoutRef<"main">) {
  return (
    <>
      <Head>
        <title>MD editor</title>
        <meta name="description" content="A Notion-inspired Markdown Editor." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DocumentHeader />
      <main className="bg-slate-100">{children}</main>
    </>
  );
}

export default Layout;
