import { NextRequest, NextResponse } from "next/server";
import {
  getLetter,
  removeLetter,
  updateLetter,
} from "@/backend/letterController";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  console.log(`try get letter by id: ${id}`);

  if (!id) {
    return NextResponse.json({ status: "ID is required" }, { status: 400 });
  }

  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return NextResponse.json({ status: `Invalid ID: ${id}` }, { status: 400 });
  }

  const letter = getLetter(parsedId);

  if (letter) {
    return NextResponse.json({ letter });
  } else {
    return NextResponse.json(
      { status: `Letter with id: ${id} not found` },
      { status: 404 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  console.log(`Try delete letter by id: ${id}`);

  if (!id) {
    return NextResponse.json({ status: "ID is required" }, { status: 400 });
  }

  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return NextResponse.json({ status: `Invalid ID: ${id}` }, { status: 400 });
  }

  const isRemoved = removeLetter(parsedId);

  if (isRemoved) {
    console.log(`Letter id: ${id} deleted`);
    return NextResponse.json(
      { status: `Letter with id: ${id} removed` },
      { status: 200 },
    );
  } else {
    console.log(`Letter with id: ${id} not found`);
    return NextResponse.json(
      { status: `Letter with id: ${id} not found` },
      { status: 404 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  console.log(`Try update letter by id: ${id}`);

  if (!id) {
    return NextResponse.json({ status: "ID is required" }, { status: 400 });
  }

  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return NextResponse.json({ status: `Invalid ID: ${id}` }, { status: 400 });
  }

  const { title, description } = await request.json();
  if (!title || !description) {
    return NextResponse.json(
      { status: "Title and description are required" },
      { status: 400 },
    );
  }

  const isUpdated = updateLetter(parsedId, title, description);

  if (isUpdated) {
    console.log(`Letter id: ${id} updated`);
    return NextResponse.json(
      { status: `Letter with id: ${id} updated` },
      { status: 200 },
    );
  } else {
    console.log(`Letter with id: ${id} not found`);
    return NextResponse.json(
      { status: `Letter with id: ${id} not found` },
      { status: 404 },
    );
  }
}
