"use client";
import { StartCollaboration, isCollabAtom } from "@/lib/collaboration";
import { Provider as AtomProvider, useAtomValue } from "jotai";
import { PropsWithChildren } from "react";

export default function Provider({ children }: PropsWithChildren) {
  return (
    <AtomProvider>
      <StartCollaboration />
      {children}
    </AtomProvider>
  );
}
