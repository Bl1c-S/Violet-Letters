import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "@/backend/jwt/jwt";

export default async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ message: "Токен отсутствует" }, { status: 401 });
  }
  const token = authHeader.split(" ")[1];

  try {
    const username = await validateToken(token);
    return Response.json({ username }, { status: 200 });
  } catch (err) {
    return Response.json({ error: err }, { status: 401 });
  }
}
