"use client";
import React, { useState } from "react";
import Link from "next/link";

type Letter = {
  title: string;
  description: string;
};

const AddLetterForm = () => {
  const [letter, setLetter] = useState<Letter>({
    title: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLetter({ ...letter, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка на заполненность полей
    if (!letter.title || !letter.description) {
      setError("Both fields are required.");
      return;
    }

    // Очистка ошибки перед отправкой
    setError(null);

    await fetch("/api/letter/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(letter),
    });

    setLetter({ title: "", description: "" });
  };

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
          value={letter.title}
          onChange={handleChange}
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
          value={letter.description}
          onChange={handleChange}
          required
          className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg shadow-sm
          focus:ring-[#4d5582] focus:ring-offset-2 focus:outline-none focus:ring-2"
        />
      </div>
      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        onClick={handleSubmit}
        className="mb-4  w-full py-2 px-4 bg-[#4d5582] hover:bg-[#454d78] text-white font-semibold rounded-lg shadow-md
                focus:ring-[#4d5582] focus:ring-offset-2 focus:outline-none focus:ring-2"
      >
        Add
      </button>
      <Link href={`/`}>
        <button
          className="w-full py-2 px-4 bg-[#cb3950] hover:bg-[#c12e45] text-white font-semibold rounded-lg shadow-md
       focus:ring-[#cb3950] focus:ring-offset-2 focus:outline-none focus:ring-2"
        >
          Cancel
        </button>
      </Link>
    </form>
  );
};

export default AddLetterForm;
