import { PropsWithChildren } from "react";
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
  return (
    <html lang="en" className="dark">
      <body
        className={`${barlow.variable} font-sans dark:bg-slate-850 dark:text-gray-200`}
      >
        <div className="grid grid-cols-[20rem_auto]">
          <SideNavigation />
          <div>
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
