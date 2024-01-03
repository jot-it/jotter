"use client";
import useWorkspace from "@/hooks/useWorkspace";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page() {
  const workspace = useWorkspace();
  const router = useRouter();

  useEffect(() => {
    router.push(`/${workspace}`);
  }, [workspace, router]);
}
