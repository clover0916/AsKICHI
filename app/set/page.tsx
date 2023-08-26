"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  host: string;
  title: string;
  place: string;
  floor: string;
  crowded: number;
  createdAt: string;
  updatedAt: string;
};

const crowdedText = [
  "混んでいない",
  "それほど混んでいない",
  "混んでいる",
  "とても混んでいる",
  "満員",
];

const crowdedColor = [
  "bg-green-500/10",
  "bg-sky-500/10",
  "bg-yellow-400/10",
  "bg-orange-600/10",
  "bg-red-600/10",
];

export default function Set() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    fetch("/api/all")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  });

  const updateCrowded = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.name;
    const crowded = parseInt(event.target.value);

    console.log(event);

    console.log(id, crowded);

    fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, crowded }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          console.log("success");
        }
      });
  };

  return (
    <main className="p-16 mx-auto">
      <h1 className="text-4xl font-bold">混雑状況管理</h1>
      <div className="grid gap-8 p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <div className="text-xl font-bold">{event.title}</div>
                <div className="text-md">{event.host}</div>
                <div className="text-md">{event.place}</div>
                <div className="text-md">{event.floor}</div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Select
                name={event.id}
                label="混雑状況"
                labelplacement="outside-left"
                defaultSelectedKeys={[event.crowded.toString()]}
                onChange={updateCrowded}
              >
                {crowdedText.map((text, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {text}
                  </SelectItem>
                ))}
              </Select>
            </CardBody>

            <CardFooter>
              最終更新：
              {new Date(event.updatedAt).toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
