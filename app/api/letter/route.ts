import { NextRequest, NextResponse } from "next/server";
import { getAllLetters } from "@/backend/letterController";

export async function GET(request: NextRequest) {
  console.log("get all letters");
  const letters = getAllLetters();
  return Response.json({ letters });
}
