"use client";
import AddLetterForm from "@/app/letter/add/components/addLetterForm";
import React from "react";

export default function Page() {
  return (
    <div
      className="min-h-screen content-center justify-center bg-cover"
      style={{ backgroundImage: 'url("/assets/violet2.png")' }}
    >
      <h1 className="text-center font-semibold text-4xl">Write a letter...</h1>
      <AddLetterForm />
    </div>
  );
}
