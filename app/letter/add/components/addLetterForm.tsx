"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@/app/components/contexts/userContext";
import { useRouter } from "next/navigation";

type Letter = {
  title: string;
  description: string;
};

const AddLetterForm = () => {
  const router = useRouter();
  const { user } = useUser();
  const [letter, setLetter] = useState<Letter>({
    title: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLetter({ ...letter, [name]: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLetter({ ...letter, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!letter.title || !letter.description) {
      setError("Поля не заполнены");
      return;
    }

    setError(null);

    const response = await fetch("/api/letter/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user?.id,
        title: letter.title,
        description: letter.description,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
    } else router.push("/letter/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-lg m-4 shadow-md bg-opacity-50  backdrop-blur"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Название
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={letter.title}
          onChange={handleInputChange}
          required
          className="w-full text-black px-3 py-2 border border-gray-300
          rounded-lg shadow-sm focus:ring-[#4d5582] focus:ring-offset-2 focus:outline-none focus:ring-2"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Содержание
        </label>
        <textarea
          id="description"
          name="description"
          value={letter.description}
          onChange={handleTextareaChange}
          required
          className="w-full text-black px-3 py-2 height-auto text-wrap
    border border-gray-300 rounded-lg shadow-sm
    focus:ring-[#4d5582] focus:ring-offset-2 focus:outline-none focus:ring-2"
          rows={4} // Количество видимых строк, можно настроить
        />
      </div>
      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <div className="flex flex-row space-x-2">
        <button
          type="submit"
          onClick={handleSubmit}
          className="mb-4 w-full py-2 px-4 bg-[#9878bc] hover:bg-[#9447d5] text-white font-semibold rounded-lg shadow-md
                focus:ring-[#4d5582] focus:ring-offset-2 focus:outline-none focus:ring-2"
        >
          Добавить
        </button>
        <Link className="block w-full" href={`/letter/`}>
          <button
            className="mb-4 w-full py-2 px-4 bg-[#cc576a] hover:bg-[#c83b51] text-white font-semibold rounded-lg shadow-md
       focus:ring-[#cb3950] focus:ring-offset-2 focus:outline-none focus:ring-2"
          >
            Отменить
          </button>
        </Link>
      </div>
    </form>
  );
};

export default AddLetterForm;
