import { NextRequest, NextResponse } from "next/server";
import { addLetter } from "@/backend/letterController";

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log(res);
  addLetter(res.title, res.description);
  return Response.json({ letter: res.title, status: "added" });
}
