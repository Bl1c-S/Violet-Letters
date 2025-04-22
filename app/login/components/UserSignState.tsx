"use client";

import React, {useMemo, memo} from "react";
import Link from "next/link";
import {useUser} from "@/app/components/contexts/userContext";
import UserPreview from "@/app/login/components/userPreview";

const UserSignState: React.FC = () => {
    const {isLoggedIn} = useUser();

    return (
        <div className="p-1">
            {isLoggedIn ? (
                <UserPreview/>
            ) : (
                <div className="flex flex-row">
                    <LinkItemBMemo title="Войти" href="/login"/>
                    <LinkItemBMemo
                        title="Регистрация"
                        href="/register"
                        style="border border-white ml-2"
                    />
                </div>
            )}
        </div>
    );
};

const LinkItemB: React.FC<{
    title: string;
    href: string;
    style?: string;
}> = ({title, href, style}) => {
    const curCss: string = `px-4 p-1 bg-transparent text-center text-white font-semibold rounded-lg focus:ring-offset-2 focus:ring-0 ${style}`;
    const currentCss = useMemo(() => {
        return curCss;
    }, [curCss]);
    return (
        <Link className={currentCss} href={href}>
            {title}
        </Link>
    );
};

const LinkItemBMemo = memo(LinkItemB);

export default UserSignState;