import { NextRequest, NextResponse } from "next/server";
import { DbUser, getUser, ParsToUser } from "@/backend/database/userDbManager";
import { apiTokenVerification } from "@/app/api/authorization/apiTokenVerifycation";

export async function GET(request: NextRequest) {
  const response = await apiTokenVerification(request);

  if (response.status !== 200) {
    return response;
  }

  try {
    const { username } = await response.json();

    console.log(`Попытка получения пользователя: ${username}`);
    const dbUser: DbUser | null = await getUser(username);

    if (dbUser) {
      const user = ParsToUser(dbUser);
      return NextResponse.json({ user });
    } else {
      return NextResponse.json(
        { status: `Пользователь: ${username} не найден` },
        { status: 404 },
      );
    }
  } catch (err) {
    console.error("Error getting user:", err);
    return NextResponse.json(
      { error: `Ошибка получения пользователя` },
      { status: 500 },
    );
  }
}
