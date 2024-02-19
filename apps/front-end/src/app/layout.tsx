import authOptions from "@/config/auth-options";
import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "next-auth";
import { Barlow } from "next/font/google";
import { PropsWithChildren } from "react";
import Providers from "./Providers";
import "./globals.css";
import { getNotebook } from "@/actions/document";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-barlow",
});

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);
  // const notebook = session && (await getNotebook());

  return (
    <Providers session={session} notebookName={undefined}>
      <html lang="en" className="dark">
        <body
          className={`${barlow.variable} font-sans dark:bg-slate-850 dark:text-gray-200`}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </Providers>
  );
}
