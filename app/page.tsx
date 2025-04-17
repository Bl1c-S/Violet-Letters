"use client";

import React, { useEffect } from "react";
import Main from "@/app/components/main";
import { useMainContext } from "@/app/components/contexts/mainContext";

const Home = () => {
  const { setBgUrl } = useMainContext();
  useEffect(() => {
    setBgUrl("/assets/violet3.png");
  }, []);

  return (
    <div className="p-6 min-h-screen bg-cover flex flex-row w-full">
      <Main />
    </div>
  );
};

export default Home;
