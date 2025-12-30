"use client";
import { TooltipProvider } from "@/components/Tooltip";
import { Provider as AtomProvider } from "jotai";
import { PropsWithChildren } from "react";

type ProvidersProps = PropsWithChildren<{
  notebookName?: string;
}>;

export default function Providers({ children }: ProvidersProps) {
  return (
    <AtomProvider>
        <TooltipProvider>{children}</TooltipProvider>
    </AtomProvider>
  );
}
