import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const { id, crowded } = data;

  await prisma.events.update({
    where: {
      id: id,
    },
    data: {
      crowded: crowded,
    },
  });

  return NextResponse.json({ status: "success" });
}
