"use client";

import React, { useEffect } from "react";
import LettersHome from "@/app/letter/components/lettersHome";
import { useMainContext } from "@/app/components/contexts/mainContext";
import Link from "next/link";

export default function LettersHomePage() {
  const { setBgUrl } = useMainContext();
  useEffect(() => {
    setBgUrl("/assets/violet8.png");
  }, []);
  return (
    <div className="min-h-screen content-center justify-center bg-cover">
      <form className="max-w-4xl mx-auto bg-white p-6 rounded-lg m-4 shadow-md bg-opacity-50  backdrop-blur">
        <Link href={`/letter/add`}>
          <button className="w-full py-2 px-4 bg-[#707070] hover:bg-[#494e52] text-white font-semibold rounded-lg shadow-md focus:ring-[#cb3950] focus:ring-offset-2 focus:outline-none focus:ring-2">
            Написать новое письмо
          </button>
        </Link>
        <LettersHome />
      </form>
    </div>
  );
}
