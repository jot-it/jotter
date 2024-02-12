"use client";
import NoSSR from "@/components/NoSSR";
import { TooltipProvider } from "@/components/Tooltip";
import { StartCollaboration } from "@/lib/collaboration";
import { Provider as AtomProvider } from "jotai";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

type ProvidersProps = PropsWithChildren<{
  session: Session | null;
}>;

export default function Providers({ session, children }: ProvidersProps) {
  return (
    <AtomProvider>
      <SessionProvider session={session}>
        <TooltipProvider>
          <NoSSR>
            {session?.user && <StartCollaboration user={session?.user} />}
          </NoSSR>
          {children}
        </TooltipProvider>
      </SessionProvider>
    </AtomProvider>
  );
}
