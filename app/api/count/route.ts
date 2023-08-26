import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const count = await prisma.events.count();

  return NextResponse.json({ count });
}
