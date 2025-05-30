"use client";
import AddLetterForm from "@/app/letter/add/components/addLetterForm";
import React, { useEffect } from "react";
import { useMainContext } from "@/app/components/contexts/mainContext";

const WriteLetter = () => {
  const { setBgUrl } = useMainContext();
  useEffect(() => {
    setBgUrl("/assets/violet1.png");
  }, []);
  return (
    <div className="min-h-screen content-center justify-center bg-cover">
      <AddLetterForm />
    </div>
  );
};

export default WriteLetter;
