"use client";
import { Letter } from "@/app/letter/[id]/page";
import React, { useState } from "react";
import Link from "next/link";
import useSWR from "swr";

const getAll = async (url: string): Promise<Letter[]> => {
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch letters");
  }
  const data = await response.json();
  return data.letters;
};

const removeLetter = async (id: string): Promise<boolean> => {
  let response: Response;
  try {
    response = await fetch(`/api/letter/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Failed to remove letter");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error removing letter:", error);
    return false;
  }
};

const LettersList = () => {
  const {
    data: letters,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/letter", getAll);

  const [deleting, setDeleting] = useState(false); // State to track deletion status

  const handleDelete = async (id: string) => {
    setDeleting(true); // Set deleting state to true while deleting
    const success = await removeLetter(id);
    if (success) {
      // If deletion successful, update data using mutate function
      mutate();
    }
    setDeleting(false); // Reset deleting state
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading letters: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center flex-w">
      {letters &&
        letters.map((letter) => (
          <div
            className="mt-4 flex gap-2 p-2 pl-4 rounded-md flex-w items-center
          bg-[#3f3c5b] hover:bg-[#373453]"
            key={letter.id}
            style={{ justifyContent: "space-between" }}
          >
            <label className="font-semibold text-[18px]">{letter.title}</label>
            <div className="flex flex-row flex-w justify-center gap-2">
              <Link href={`/letter/${letter.id}`}>
                <button
                  className="w-full py-2 px-4 bg-[#cb3950] hover:bg-[#c12e45] text-white font-semibold rounded-lg shadow-md
       focus:ring-[#cb3950] focus:ring-offset-2 focus:outline-none focus:ring-2"
                >
                  Edit
                </button>
              </Link>

              <button
                className="w-full py-2 px-4 bg-[#cb3950] hover:bg-[#c12e45] text-white font-semibold rounded-lg shadow-md focus:ring-[#cb3950] focus:ring-offset-2 focus:outline-none focus:ring-2"
                onClick={() => handleDelete(`${letter.id}`)}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LettersList;
