import React, {useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/app/components/contexts/userContext";
import {
    InputItem,
    InputError,
    InputItemRef,
    GetRef,
} from "@/app/login/components/InputItem";
import authorization from "@/app/login/components/Authorization";

const LoginForm: React.FC = () => {
    const {getUser} = useUser();
    const router = useRouter();
    const [error, setError] = useState("");

    const usernameRef = useRef<InputItemRef>(null);
    const passwordRef = useRef<InputItemRef>(null);
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const username = GetRef(usernameRef);
        const password = GetRef(passwordRef);

        try {
            if (username && password) {
                const response = await login(username, password);

                if (response.ok) {
                    const data = await response.json();
                    authorization(data.basicToken, data.refreshToken);
                    await getUser();
                    router.push("/");
                } else {
                    console.error("Ошибка получения токена");
                    setError("Ошибка входа, попробуйте снова.");
                }
            } else {
                console.error("Пользователь или пароль не указан");
                setError("Пользователь или пароль не указан.");
            }
        } catch (error) {
            console.error("Ошибка входа", error);
            setError("Ошибка входа, попробуйте снова.");
        }
    };

    return (
        <div
            className="flex flex-col max-w-md mx-auto bg-white p-6 rounded-lg shadow-md m-4 bg-opacity-50  backdrop-blur">
            <InputItem title={"Пользователь"} type={"username"} ref={usernameRef}/>
            <InputItem title={"Пароль"} type={"password"} ref={passwordRef}/>
            <InputError error={error}/>
            <button
                onClick={handleLogin}
                type="submit"
                className="w-full py-2 px-4 text-white font-semibold rounded-lg bg-[#5b6290] hover:bg-blue-600"
            >
                Войти
            </button>
        </div>
    );
};
export default LoginForm;

const login = async (username: string, password: string) => {
    const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });

    if (!response.ok) new Error("Ошибка получения токена из сервера");
    return response;
};
