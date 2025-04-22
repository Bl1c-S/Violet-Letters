import { NextRequest } from "next/server";
import { apiTokenVerification } from "@/app/api/authorization/apiTokenVerification";

export default async function POST(request: NextRequest) {
  return await apiTokenVerification(request);
}
