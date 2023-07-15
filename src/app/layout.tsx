import { Barlow } from "next/font/google";
import { PropsWithChildren, lazy } from "react";
import Header from "./Header";
import SideNavigation from "./SideNavigation";
import "./globals.css";
import PersistenceProvider from "./PersistenceProvider";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-barlow",
});

const SidebarContextProvider = lazy(
  () => import("@/components/Sidebar/SidebarContextProvider"),
);

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <PersistenceProvider>
      <html lang="en" className="dark">
        <body
          className={`${barlow.variable} font-sans dark:bg-slate-850 dark:text-gray-200`}
        >
          <SidebarContextProvider>
            <div className="grid lg:grid-cols-[20rem_auto]">
              <aside className="hidden lg:block">
                <SideNavigation />
              </aside>
              <div>
                <Header />
                {children}
              </div>
            </div>
          </SidebarContextProvider>
        </body>
      </html>
    </PersistenceProvider>
  );
}
