"use client";

import { useUser } from "@/app/components/contexts/userContext";
import React from "react";
import LettersList from "@/app/letter/components/letter-list";

const LettersHome: React.FC = () => {
  return <LettersList />;
};

export default LettersHome;
