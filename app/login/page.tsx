"use client";

import React, { useEffect } from "react";
import LoginForm from "@/app/login/components/loginForm";
import { useMainContext } from "@/app/components/contexts/mainContext";

const Login = () => {
  const { setBgUrl } = useMainContext();
  useEffect(() => {
    setBgUrl("/assets/violet2.png");
  }, []);

  return (
    <div className="min-h-screen content-center justify-center bg-cover">
      <LoginForm />
    </div>
  );
};

export default Login;
