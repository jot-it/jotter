import { Barlow } from "next/font/google";
import { PropsWithChildren } from "react";
import Header from "./Header";
import SideNavigation from "./SideNavigation";
import "./globals.css";
import { Provider } from "./Provider";
import { StartCollaboration } from "@/lib/collaboration";
import { TooltipProvider } from "@/components/Tooltip";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-barlow",
});

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <TooltipProvider>
      <Provider>
        <StartCollaboration />
        <html lang="en" className="dark">
          <body
            className={`${barlow.variable} font-sans dark:bg-slate-850 dark:text-gray-200`}
          >
            <div className="grid lg:grid-cols-[20rem_auto]">
              <aside className="hidden lg:block">
                <SideNavigation />
              </aside>
              <div>
                <Header />
                {children}
              </div>
            </div>
          </body>
        </html>
      </Provider>
    </TooltipProvider>
  );
}
