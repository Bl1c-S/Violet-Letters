"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useMainContext } from "@/app/components/contexts/mainContext";

const EditLetterForm = dynamic(
  () => import("@/app/letter/[id]/components/editLetterForm"),
  {
    ssr: false,
  },
);

export default function LetterPage({ params }: { params: { id: string } }) {
  const { setBgUrl } = useMainContext();
  useEffect(() => {
    setBgUrl("/assets/violet1.png");
  }, []);
  return (
    <div className="min-h-screen content-center justify-center bg-cover">
      <EditLetterForm params={params} />
    </div>
  );
}
