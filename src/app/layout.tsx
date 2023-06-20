import { PropsWithChildren } from "react";
import { Barlow } from "next/font/google";
import "./globals.css";
import SideNavigation from "./SideNavigation";

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
        <div className="grid min-h-screen grid-cols-[1fr_3fr]">
          <SideNavigation />
          {children}
        </div>
      </body>
    </html>
  );
}
