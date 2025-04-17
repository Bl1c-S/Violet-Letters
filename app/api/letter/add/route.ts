import { NextRequest, NextResponse } from "next/server";
import { addLetter, Letter } from "@/backend/database/letterDbManager";

export async function POST(request: NextRequest) {
  const res = await request.json();
  const id = crypto.randomUUID();
  console.log(res);
  const letter: Letter = {
    user_id: res.user_id,
    id: id,
    title: res.title,
    description: res.description,
  };
  await addLetter(letter);
  return Response.json({}, { status: 200 });
}
