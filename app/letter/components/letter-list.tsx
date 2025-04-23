"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useUser} from "@/app/components/contexts/userContext";
import {Letter} from "@/backend/database/letterDbManager";
import {requestAdapterWithRefreshStage} from "@/app/components/request/requestAdapter";

const LettersList = () => {
    const [letters, setLetters] = useState<Letter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
    const {user} = useUser();

    useEffect(() => {
        let isActive = true;
        const fetchLetters = async () => {
            if (!user) return;
            try {
                const fetchedLetters = await getAllLetters();
                if (isActive) setLetters(fetchedLetters);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Неизвестная ошибка";
                setError(`Ошибка загрузки писем: ${errorMessage}`);
                console.error("Ошибка при загрузке писем:", err);
            } finally {
                if (isActive) setLoading(false);
            }
        };
        setLoading(true);
        void fetchLetters();
        isActive = false;
    }, [user]);

    const handleDelete = async (id: string) => {
        setDeletingIds((prev) => new Set(prev).add(id));
        const success = await removeLetter(id);
        if (success) {
            setLetters((prev) => prev.filter((letter) => letter.id !== id));
        }
        setDeletingIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    if (loading) return <div>Загрузка писем...</div>;
    if (error) return <div>{error}</div>;

    if (letters.length == 0) return <div>Письма отсутствуют</div>;

    return (
        <div className="flex flex-col justify-center flex-w">
            {letters.map((letter) => (
                <div
                    className="mt-4 flex gap-2 p-2 pl-4 rounded-md flex-w items-center bg-white hover:bg-gray-50"
                    key={letter.id}
                    style={{justifyContent: "space-between"}}
                >
                    <label className="font-semibold text-[18px] text-gray-700">
                        {letter.title}
                    </label>
                    <div className="flex flex-row flex-w justify-center gap-2">
                        <Link href={`/letter/${letter.id}`}>
                            <button
                                className="w-full py-2 px-4 bg-[#c5a193] hover:bg-[#ffddb4] text-white font-semibold rounded-lg shadow-md focus:ring-[#cb3950] focus:ring-offset-2 focus:outline-none focus:ring-2">
                                Изменить
                            </button>
                        </Link>

                        <button
                            className="w-full py-2 px-4 bg-[#c5a193] hover:bg-[#ffddb4] text-white font-semibold rounded-lg shadow-md focus:ring-[#cb3950] focus:ring-offset-2 focus:outline-none focus:ring-2"
                            onClick={() => handleDelete(letter.id)}
                            disabled={deletingIds.has(letter.id)} // Блокировка кнопки для конкретного письма
                        >
                            {deletingIds.has(letter.id) ? "Удаляется..." : "Удалить"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LettersList;

const getAllLetters = async (): Promise<Letter[]> => {
    const data = await requestAdapterWithRefreshStage({
        url: "/api/letter/getAll",
        method: "GET",
        token: undefined,
    });
    return data.letters;
};

const removeLetter = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`/api/letter/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            console.log(`Неудачное удаление письма ${id}.`);
            return false;
        }
        return true;
    } catch (error) {
        console.error(`Ошибка удаления письма ${id}: `, error);
        return false;
    }
};