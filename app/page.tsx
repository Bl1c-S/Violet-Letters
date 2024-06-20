import Link from "next/link";
import LettersList from "@/app/letter/[id]/components/letter-list";
import React from "react";

export default async function Home() {
  return (
    <body style={{ background: "transparent" }}>
      <h1 className="text-center font-semibold text-4xl">Violet letters</h1>
      <form className="max-w-md mx-auto p-6 rounded-lg bg-white shadow-md m-4">
        <Link href={`/letter/add`}>
          <button
            className="w-full py-2 px-4 bg-[#cb3950] hover:bg-[#c12e45] text-white font-semibold rounded-lg shadow-md
          focus:outline-none focus:ring-2 focus:ring-[#cb3950] focus:ring-offset-2"
          >
            Write a new letter
          </button>
        </Link>
        <LettersList />
      </form>
    </body>
  );
}
