"use client";
import Link from "next/link";
import { useState } from "react";
import { RiBook2Line as BookIcon } from "react-icons/ri";
import Avatar from "../components/Avatar";
import Breadcrumbs from "../components/Breadcrumbs";
import Paper from "../components/Paper";
import Sidebar from "../components/Sidebar";
import Typography from "../components/Typography";
import sidebarConfig from "../components/sidebarConfig";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "MD editor",
//   description: "Markdown editor",
// };

export default function Home() {
  const [sidebar, setSidebar] = useState(sidebarConfig);

  return (
    <>
      <div className="grid min-h-screen grid-cols-[1fr_3fr]">
        <Sidebar>
          {/* Add new page */}
          <Sidebar.ItemList items={sidebar} />
          <div className="space-y-1">
            <Sidebar.Divider />
            <Sidebar.AddButton
              onClick={() =>
                setSidebar([
                  ...sidebar,
                  {
                    type: "link",
                    label: "New page",
                    href: "#new-page",
                  },
                ])
              }
            />
          </div>
        </Sidebar>
        <main>
          <header className="flex items-center border-b border-gray-200 p-4 shadow-sm">
            <Breadcrumbs aria-label="Breadcrumb">
              <Link
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                href="#"
              >
                <Typography as="span" variant="body1">
                  <BookIcon className="mr-1 inline-block text-lg" />
                  Chapter 1
                </Typography>
              </Link>
              <Link
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                href="#"
              >
                Section a
              </Link>
              <Link
                className="rounded-md p-2 text-gray-800 hover:bg-gray-100"
                href="#"
                aria-current="page"
              >
                Topic 1
              </Link>
            </Breadcrumbs>

            {/* Current users in this notebook */}
            <div className="ml-auto mr-4 flex -space-x-1 text-white">
              <Avatar className="bg-gray-200 text-gray-700" size="lg">
                +5
              </Avatar>
              <Avatar className="bg-orange-500 ring ring-white" size="lg">
                JD
              </Avatar>
              <Avatar className="bg-red-500 ring ring-white" size="lg">
                KS
              </Avatar>
              <Avatar className="bg-indigo-500 ring ring-white" size="lg">
                MG
              </Avatar>
            </div>

            <Typography
              as="button"
              variant="button"
              className="rounded-md bg-gray-700 px-4 py-2 text-white shadow-sm hover:bg-gray-600"
            >
              Share
            </Typography>
          </header>
          <Paper />
        </main>
      </div>
    </>
  );
}
