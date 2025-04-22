import React, {useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/app/components/contexts/userContext";
import {
    GetRef,
    InputError,
    InputItem,
    InputItemRef,
} from "@/app/login/components/InputItem";
import authorization from "@/app/login/components/Authorization";

const Register: React.FC = () => {
    const {getUser} = useUser();
    const router = useRouter();
    const [error, setError] = useState("");

    const usernameRef = useRef<InputItemRef>(null);
    const passwordRef = useRef<InputItemRef>(null);
    const confirmPasswordRef = useRef<InputItemRef>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const username = GetRef(usernameRef);
        const password = GetRef(passwordRef);
        const confirmPassword = GetRef(confirmPasswordRef);

        if (!username || !password) {
            setError("Пользователь или пароль не указан");
            return;
        }
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }
        try {
            const response = await register(username, password);
            if (!response.ok) {
                if (response.status === 403) {
                    setError("Пользователь уже существует");
                } else {
                    setError("Ошибка регистрации пользователя, попробуйте снова");
                }
            }
            const data = await response.json();
            authorization(data.basicToken, data.refreshToken);
            await getUser();
            router.push("/");
        } catch (error) {
            console.error(error);
            setError("Ошибка регистрации пользователя, попробуйте снова");
        }
    };

    return (
        <div
            className="flex flex-col max-w-md mx-auto bg-white p-6 rounded-lg shadow-md m-4 bg-opacity-50  backdrop-blur">
            <InputItem title={"Пользователь"} type={"username"} ref={usernameRef}/>
            <InputItem title={"Пароль"} type={"password"} ref={passwordRef}/>
            <InputItem
                title={"Подтверждение пароля"}
                type={"confirmPassword"}
                ref={confirmPasswordRef}
            />
            <InputError error={error}/>

            <button
                onClick={handleRegister}
                type="submit"
                className="w-full py-2 px-4 text-white font-semibold rounded-lg bg-[#3a597a] hover:bg-blue-600"
            >
                Зарегистрироваться
            </button>
        </div>
    );
};
export default Register;

const register = async (username: string, password: string) => {
    const response = await fetch("/api/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
    });
    return response;
};
