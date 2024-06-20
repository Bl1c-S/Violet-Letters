"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Обновите путь к вашей функции

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const EditLetterForm = ({ params }: { params: { id: string } }) => {
  const {
    data: letter,
    isLoading,
    error,
  } = useSWR(`/api/letter/${params.id}`, fetcher);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (letter) {
      setTitle(letter.title);
      setDescription(letter.description);
    }
  }, [letter]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/letter/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error("Failed to update letter");
      }
      // Navigate back or show success message
      router.push("/");
    } catch (error) {
      console.error("Error updating letter:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading letter</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md m-4"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#4d5582] focus:ring-offset-2 focus:outline-none focus:ring-2"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          required
          className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#4d5582] focus:ring-offset-2 focus:outline-none focus:ring-2"
        />
      </div>
      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        className="mb-4 w-full py-2 px-4 bg-[#4d5582] hover:bg-[#454d78] text-white font-semibold rounded-lg shadow-md focus:ring-[#4d5582] focus:ring-offset-2 focus:outline-none focus:ring-2"
      >
        Save
      </button>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Link href={`/`}>
        <button className="w-full py-2 px-4 bg-[#cb3950] hover:bg-[#c12e45] text-white font-semibold rounded-lg shadow-md focus:ring-[#cb3950] focus:ring-offset-2 focus:outline-none focus:ring-2">
          Cancel
        </button>
      </Link>
    </form>
  );
};

export default EditLetterForm;
