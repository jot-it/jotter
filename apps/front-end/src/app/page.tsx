"use client";
import { useLocalIdentity } from "@/lib/identity-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const router = useRouter();
  const identity = useLocalIdentity();

  useEffect(() => {
    // Redirect to the user's unique notebook
    router.push(`/${identity.id}`);
  }, [router, identity]);

  return null;
}

export default Home;
