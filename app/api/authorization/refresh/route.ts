import { NextRequest, NextResponse } from "next/server";
import { createNewToken, validateToken } from "@/backend/jwt/jwt";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      { message: "Токен обновления отсутствует" },
      { status: 401 },
    );
  }
  const oldRefreshToken = authHeader.split(" ")[1];
  try {
    const username = await validateToken(oldRefreshToken);
    const data = await createTokens(username);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Ошибка обновления токенов ${error}` },
      { status: 500 },
    );
  }
}

export const createTokens = async (username: string) => {
  const refreshToken = await createNewToken({ username }, "7d");
  const basicToken = await createNewToken({ username }, "1h");
  return { refreshToken, basicToken };
};
