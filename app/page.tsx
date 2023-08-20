"use client";

import Group from "@/components/group";
import { useEffect, useState } from "react";

type Event = {
  host: string;
  title: string;
  place: string;
  id: string;
};

type FloorEvents = {
  [floor: string]: Event[];
};

type EventData = {
  "1F-2F": Event[];
  "3F": Event[];
  "4F": Event[];
};

export default function Home() {
  const [events, setEvents] = useState<EventData>({} as EventData);
  const [floor, setFloor] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/events.json").then((res) => {
      res.json().then((json) => {
        setEvents(json);
        if (floor === 0) setFloor(1);
        console.log(json);
      });
    });
    const intervalId = setInterval(() => {
      if (floor === 3) {
        setFloor(1);
      } else {
        setFloor(floor + 1);
      }
    }, 2000);
    return () => clearInterval(intervalId);
  }, [floor]);

  return (
    <div className="flex h-screen justify-center">
      <div className="flex-1 bg-gray-50">映像</div>
      <div className="flex flex-col w-[32rem]">
        <h1 className="text-4xl font-bold text-center p-8">混雑状況</h1>
        <h3 className="text-3xl font-bold px-8">
          {floor === 1 && "1F-2F"}
          {floor === 2 && "3F"}
          {floor === 3 && "4F"}
        </h3>
        <div className="grid grid-rows-[repeat(8,1fr)] p-4 gap-4 rounded overflow-hidden shadow-lg m-4 flex-1">
          {floor === 1 &&
            events["1F-2F"].map((event) => {
              return (
                <Group
                  host={event.host}
                  title={event.title}
                  place={event.place}
                  status={0}
                />
              );
            })}
          {floor === 2 &&
            events["3F"].map((event) => {
              return (
                <Group
                  host={event.host}
                  title={event.title}
                  place={event.place}
                  status={1}
                />
              );
            })}
          {floor === 3 &&
            events["4F"].map((event) => {
              return (
                <Group
                  host={event.host}
                  title={event.title}
                  place={event.place}
                  status={2}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
