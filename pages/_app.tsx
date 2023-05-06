import type { AppProps } from "next/app";
import "../styles/globals.css";
import { Barlow } from "@next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-barlow",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${barlow.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
