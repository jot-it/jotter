"use client";
import Paper from "@/components/Paper";
import { useParams } from "next/navigation";
import Header from "@/app/Header";

export default function Editor() {
  const params = useParams();
  return (
    <main>
      <Paper />
    </main>
  );
}
