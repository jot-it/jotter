"use client";
import { TooltipProvider } from "@/components/Tooltip";
import { IdentityProvider } from "@/lib/identity-provider";
import { Provider as AtomProvider } from "jotai";
import { PropsWithChildren } from "react";

type ProvidersProps = PropsWithChildren<{
  notebookName?: string;
}>;

export default function Providers({ children }: ProvidersProps) {
  return (
    <AtomProvider>
      <IdentityProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </IdentityProvider>
    </AtomProvider>
  );
}
