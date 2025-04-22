"use client";

import React, {useMemo, useRef, useState} from "react";
import {useUser} from "@/app/components/contexts/userContext";
import {User} from "@/backend/database/userDbManager";
import {
    GetRef,
    InputItem,
    InputItemRef,
} from "@/app/login/components/InputItem";
import {getUserToken} from "@/app/login/components/Authorization";

const Profile: React.FC = () => {
    const {user} = useUser();
    const [userChanged, setUserChanged] = useState(false);
    let formUser = useMemo(() => {
        return user;
    }, [user]);

    const usernameRef = useRef<InputItemRef>(null);
    const descriptionRef = useRef<InputItemRef>(null);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setUserChanged(false);
        const username = GetRef(usernameRef);
        const descript = GetRef(descriptionRef);

        if (formUser) {
            if (formUser.username !== username && username) {
                formUser.username = username;
                setUserChanged(true);
            }
            if (formUser.descript !== descript) {
                if (descript) formUser.descript = descript;
                else formUser.descript = "";
                setUserChanged(true);
            }
            if (userChanged) {
                await update(formUser);
            }
        }
    };

    if (!formUser) return <div>Нихуя</div>;

    return (
        <div
            className="flex flex-col content-center max-w-md mx-auto bg-white p-6 rounded-lg shadow-md m-4 bg-opacity-50 backdrop-blur">
            <div className="flex items-center justify-center">
                <Avatar user={formUser}/>
            </div>
            <About user={formUser} nameRef={usernameRef} descRef={descriptionRef}/>
            <button
                className="py-2 px-4 text-white font-semibold rounded-lg bg-[#283e50] hover:bg-[#192834]"
                onClick={handleSave}
            >
                Сохранить изменения
            </button>
        </div>
    );
};
export default Profile;

const Avatar: React.FC<{ user: User }> = ({user}) => {
    return (
        <div
            className="w-16 h-16 rounded-full bg-cover bg-center mx-4"
            style={{backgroundImage: `url(${user.avatarUrl})`}}
        />
    );
};
const About: React.FC<{
    user: User;
    nameRef: React.RefObject<InputItemRef>;
    descRef: React.RefObject<InputItemRef>;
}> = ({user, nameRef, descRef}) => {
    return (
        <div>
            <InputItem
                title="Им'я"
                type="username"
                startValue={user?.username}
                ref={nameRef}
            />
            <InputItem
                title="Обомне"
                type="description"
                startValue={user?.descript}
                ref={descRef}
            />
        </div>
    );
};

const update = async (user: User) => {
    const token = getUserToken();
    if (token) {
        const res = await fetch("/api/users/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({user}),
        });
        if (!res.ok) {
            const data = await res.json();
            console.error(data.error);
        }
    } else throw new Error("Отсутствует токен");
};
