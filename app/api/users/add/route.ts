import {NextRequest} from "next/server";
import {addUser, DbUser} from "@/backend/database/userDbManager";
import {hashPassword} from "@/backend/cryptoUtils";
import {createTokens} from "@/app/api/authorization/refresh/route";

export async function POST(request: NextRequest) {
    try {
        const {username, password} = await request.json();

        const id = crypto.randomUUID();
        const hashPass = await hashPassword(password);
        const user: DbUser = {
            id: id,
            username: username,
            descript: "",
            password: hashPass,
            avatarUrl: "/assets/violetava.png",
        };

        console.log(`Попытка добавления нового пользователя: ${username}`);
        await addUser(user);
        const data = await createTokens(username);
        return Response.json(data, {
            status: 200,
        });
    } catch (error: any) {
        console.error(error);
        if (error.message === "Пользователь уже существует")
            return Response.json(
                {error: "Пользователь уже существует"},
                {status: 403},
            );
        return Response.json({error: error.message}, {status: 500});
    }
}
