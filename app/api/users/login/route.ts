import { verifyPassword } from "@/backend/cryptoUtils";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/backend/database/userDbManager";
import { createTokens } from "@/app/api/authorization/refresh/route";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  const userdb = await getUser(username);

  if (userdb && (await verifyPassword(password, userdb.password))) {
    const data = await createTokens(username);
    return NextResponse.json(data, { status: 200 });
  }
  console.log("неверное имя пользователя или пароль при получении токена");
  return NextResponse.json(
    { error: "Ошибка получения токена" },
    { status: 401 },
  );
}
