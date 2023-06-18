"use client";
import { PropsWithChildren, useState } from "react";
import { Barlow } from "next/font/google";
import "./globals.css";
import SideNavigation from "./SideNavigation";
import Header from "./Header";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-barlow",
});

export default function RootLayout({ children }: PropsWithChildren) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () => setOpenSidebar((prev) => !prev);
  return (
    <html lang="en" className="dark">
      <body
        className={`${barlow.variable} font-sans dark:bg-slate-850 dark:text-gray-200`}
      >
        <div className="grid lg:grid-cols-[20rem_auto]">
          <SideNavigation open={openSidebar} toggleOpen={toggleSidebar} />
          <div>
            <Header toggleOpen={toggleSidebar} />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
