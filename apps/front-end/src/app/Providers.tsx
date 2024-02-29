"use client";
import { TooltipProvider } from "@/components/Tooltip";
import { Provider as AtomProvider } from "jotai";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

type ProvidersProps = PropsWithChildren<{
  session: Session | null;
  notebookName?: string;
}>;

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <AtomProvider>
      <SessionProvider session={session}>
        <TooltipProvider>{children}</TooltipProvider>
      </SessionProvider>
    </AtomProvider>
  );
}
