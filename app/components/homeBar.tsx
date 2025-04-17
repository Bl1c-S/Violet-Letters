import React from "react";
import UserSignState from "@/app/login/components/userSingState";
import Link from "next/link";

const HomeBar = () => {
  return (
    <div className="p-2 flex flex-row bg-white bg-opacity-30 shadow-md backdrop-blur">
      <Link className="pl-4" href="/">
        <h1 className="text-center text-3xl text-white">Почтовая компания</h1>
      </Link>
      <div className="ml-auto">
        <UserSignState />
      </div>
    </div>
  );
};
export default HomeBar;
