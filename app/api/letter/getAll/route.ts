import {NextRequest, NextResponse} from "next/server";
import {getAllLetters} from "@/backend/database/letterDbManager";
import {
    apiTokenVerification
} from "@/app/api/authorization/apiTokenVerification";
import {getUser} from "@/backend/database/userDbManager";

export async function GET(request: NextRequest) {
    const response = await apiTokenVerification(request);
    const {username} = await response.json();

    const userdb = await getUser(username);
    if (userdb) {
        const letters = await getAllLetters(userdb.id);
        return Response.json({letters});
    } else
        return NextResponse.json(
            {message: "Ошибка валидации токена"},
            {status: 401},
        );
}
