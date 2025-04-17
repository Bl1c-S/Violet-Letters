import { NextRequest, NextResponse } from "next/server";
import {
  getLetter,
  Letter,
  removeLetter,
  updateLetter,
} from "@/backend/database/letterDbManager";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  console.log(`Попытка получения письма: ${id}`);

  if (!id) {
    return NextResponse.json({ status: "ID не указан." }, { status: 400 });
  }

  const letter = await getLetter(id);

  if (letter) {
    return NextResponse.json({ letter });
  } else {
    return NextResponse.json(
      { status: `Письмо: ${id} не найдено.` },
      { status: 404 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  console.log(`Попытка удаления письма: ${id}`);

  const isRemoved = await removeLetter(id);

  if (isRemoved) {
    console.log(`Письмо: ${id} удалено.`);
    return NextResponse.json(
      { status: `Письмо: ${id} удалено.` },
      { status: 200 },
    );
  } else {
    console.log(`Письмо: ${id} не найдено.`);
    return NextResponse.json(
      { status: `Письмо: ${id} не найдено.` },
      { status: 404 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: Letter } },
) {
  const { letter } = await request.json();
  console.log(`Попытка обновления письма: ${letter.id}`);

  if (!letter.title || !letter.description) {
    return NextResponse.json(
      { status: "Название или контент не указан." },
      { status: 400 },
    );
  }

  const isUpdated = await updateLetter(letter);

  if (isUpdated) {
    console.log(`Письмо: ${letter.id} обновлено.`);
    return NextResponse.json(
      { status: `Письмо: ${letter.id} обновлено.` },
      { status: 200 },
    );
  } else {
    console.log(`Письмо: ${letter.id} не найдено.`);
    return NextResponse.json(
      { status: `Письмо: ${letter.id} не найдено.` },
      { status: 404 },
    );
  }
}
