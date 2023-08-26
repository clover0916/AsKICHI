import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

type Event = {
  host: string;
  title: string;
  place: string;
  id: string;
};

type EventType = "1F-2F" | "3F" | "4F";

type EventData = Record<EventType, Event[]>;

export async function GET(request: Request) {
  const page = parseInt(
    new URL(request.url).searchParams.get("page") as string
  );
  const count = await prisma.events.count();

  const events = await prisma.events.findMany({
    orderBy: {
      floor: "asc",
    },
  });

  return NextResponse.json(events);
}
