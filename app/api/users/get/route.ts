import { NextRequest, NextResponse } from "next/server";
import { DbUser, getUser, ParsToUser } from "@/backend/database/userDbManager";
import { validateToken } from "@/backend/jwt/jwt";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ status: "Токен отсутствует" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedData = await validateToken(token);
    console.log(`Попытка получения пользователя: ${decodedData.username}`);
    const dbUser: DbUser | null = await getUser(decodedData.username);

    if (dbUser) {
      const user = ParsToUser(dbUser);
      return NextResponse.json({ user });
    } else {
      return NextResponse.json(
        { status: `Пользователь: ${decodedData.username} не найден` },
        { status: 404 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: `Ошибка верификации токена` },
      { status: 500 },
    );
  }
}
