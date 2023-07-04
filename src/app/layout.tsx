"use client";
import sidebarConfig from "@/sidebarConfig";
import { Barlow } from "next/font/google";
import { PropsWithChildren } from "react";
import Header from "./Header";
import SideNavigation from "./SideNavigation";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-barlow",
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${barlow.variable} font-sans dark:bg-slate-850 dark:text-gray-200`}
      >
        <div className="grid lg:grid-cols-[20rem_auto]">
          <aside className="hidden lg:block">
            <SideNavigation />
          </aside>
          <div>
            <Header items={sidebarConfig} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
