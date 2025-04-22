import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/backend/jwt/jwt";

export const apiTokenVerification = async (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return response401;

  const token = authHeader.split(" ")[1];

  try {
    const username = await validateToken(token);
    if (!username) return response401;
    return NextResponse.json(username, { status: 200 });
  } catch (error) {
    console.error("Ошибка проверки токена:", error);
    return response401;
  }
};
export const response401 = NextResponse.json(
  { message: "Ошибка валидации токена" },
  { status: 401 },
);