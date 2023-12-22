"use client";
import NoSSR from "@/components/NoSSR";
import { StartCollaboration } from "@/lib/collaboration";
import { Provider as AtomProvider } from "jotai";
import { PropsWithChildren } from "react";

export default function Provider({ children }: PropsWithChildren) {
  return (
    <AtomProvider>
      <NoSSR>
        <StartCollaboration />
      </NoSSR>
      {children}
    </AtomProvider>
  );
}
