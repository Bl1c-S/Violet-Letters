"use client";

import "./globals.css";
import React from "react";
import HomeBar from "@/app/components/homeBar";
import { MainProvider } from "@/app/components/contexts/mainContext";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/letter.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <MainProvider>
          <HomeBar />
          <div>{children}</div>
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
