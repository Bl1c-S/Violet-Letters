import { NextRequest } from "next/server";
import { updateUser, User } from "@/backend/database/userDbManager";

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const user = data.user;
    console.log(`Попытка обновления пользователя: ${(user.username, user.id)}`);

    if (user as User) await updateUser(user);

    console.log(`Пользователь ${user.username} Успешно обновлен`);
    return Response.json({}, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 403 });
  }
}
