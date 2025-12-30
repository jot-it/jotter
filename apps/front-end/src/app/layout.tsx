import { Analytics } from "@vercel/analytics/react";
import { Barlow } from "next/font/google";
import { PropsWithChildren } from "react";
import Providers from "./Providers";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-barlow",
});

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
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
