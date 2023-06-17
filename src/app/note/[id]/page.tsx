"use client";
import Paper from "@/components/Paper";
import { useParams } from "next/navigation";
import Header from "@/app/Header";

export default function Editor() {
  const params = useParams();
  console.log(params.id);
  return (
    <main>
      <Header />
      <Paper />
    </main>
  );
}
