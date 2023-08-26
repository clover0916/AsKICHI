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
  const limit = 5;

  if (count === 0) {
    const data = await fetch("http://localhost:3000/events.json");
    const events: EventData = await data.json();

    //Get all eventsn but hold floor data
    const events1F2F = events["1F-2F"];
    const events3F = events["3F"];
    const events4F = events["4F"];

    events1F2F.forEach(async (event) => {
      await prisma.events.create({
        data: {
          title: event.title,
          place: event.place,
          host: event.host,
          floor: "1F-2F",
          id: event.id,
          crowded: 0,
        },
      });
    });

    events3F.forEach(async (event) => {
      await prisma.events.create({
        data: {
          title: event.title,
          place: event.place,
          host: event.host,
          floor: "3F",
          id: event.id,
          crowded: 0,
        },
      });
    });

    events4F.forEach(async (event) => {
      await prisma.events.create({
        data: {
          title: event.title,
          place: event.place,
          host: event.host,
          floor: "4F",
          id: event.id,
          crowded: 0,
        },
      });
    });
  }

  const events = await prisma.events.findMany({
    orderBy: {
      floor: "asc",
    },
  });

  const res = events.slice((page - 1) * limit, page * limit);

  return NextResponse.json(res);
}
