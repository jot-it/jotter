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
  notebookName?: string;
}>;

export default function Providers({
  children,
  session,
  notebookName,
}: ProvidersProps) {
  return (
    <AtomProvider>
      <SessionProvider session={session}>
        <TooltipProvider>
          <NoSSR>
            {session?.user && notebookName && (
              <StartCollaboration
                user={session?.user}
                notebookName={notebookName}
              />
            )}
          </NoSSR>
          {children}
        </TooltipProvider>
      </SessionProvider>
    </AtomProvider>
  );
}
