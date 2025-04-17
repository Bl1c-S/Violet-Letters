"use client";

import React, { useEffect } from "react";
import { useMainContext } from "@/app/components/contexts/mainContext";
import Profile from "@/app/me/components/profile";

const Home = () => {
  const { setBgUrl } = useMainContext();
  useEffect(() => {
    setBgUrl("/assets/violet13.png");
  }, []);

  return (
    <div className="min-h-screen content-center justify-center bg-cover">
      <Profile />
    </div>
  );
};

export default Home;
