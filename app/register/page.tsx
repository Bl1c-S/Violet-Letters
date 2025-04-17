"use client";

import React, { useEffect } from "react";
import Register from "@/app/register/components/register";
import { useMainContext } from "@/app/components/contexts/mainContext";

export default function RegisterPage() {
  const { setBgUrl } = useMainContext();
  useEffect(() => {
    setBgUrl("/assets/violet10.png");
  }, []);

  return (
    <div className="min-h-screen content-center justify-center bg-cover">
      <Register />
    </div>
  );
}
