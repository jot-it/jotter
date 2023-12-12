"use client";
import { StartCollaboration } from "@/lib/collaboration";
import { Provider as AtomProvider } from "jotai";
import { PropsWithChildren } from "react";

export default function Provider({ children }: PropsWithChildren) {
  return (
    <AtomProvider>
      <StartCollaboration />
      {children}
    </AtomProvider>
  );
}
