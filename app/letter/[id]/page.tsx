"use client";
import dynamic from "next/dynamic";
import React from "react";
// import EditLetterForm from "@/app/letter/[id]/components/editLetterForm";

const EditLetterForm = dynamic(
  () => import("@/app/letter/[id]/components/editLetterForm"),
  {
    ssr: false,
  },
);

export type Letter = {
  id: number;
  title: string;
  description: string;
};

export default function LetterPage({ params }: { params: { id: string } }) {
  return (
    <div
      className="min-h-screen content-center justify-center bg-cover"
      style={{ backgroundImage: 'url("/assets/violet2.png")' }}
    >
      <h1 className="text-center font-semibold text-4xl">
        Please amend your letter...
      </h1>
      <EditLetterForm params={params} />
    </div>
  );
}
