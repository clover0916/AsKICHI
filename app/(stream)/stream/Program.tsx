"use client";

import { useCallback, useEffect, useState } from "react";
import Live from "./Live";

type Event = {
  title: string;
  name: string;
  description: string;
  open?: string;
  start: string;
  end: string;
};

type EventSchedule = Event[][];

type EventType = "hall" | "arena" | "clothing";

type EventData = {
  [key in EventType]: EventSchedule;
};

export default function Program() {
  const [progress, setProgress] = useState<number>(0);
  const [show, setShow] = useState<number>(0);
  const [program, setProgram] = useState<EventData>({
    hall: [],
    arena: [],
    clothing: [],
  });

  useEffect(() => {
    fetch(`/program.json`)
      .then((res) => res.json())
      .then((data) => {
        setProgram(data);
      });
  }, []);

  /*
  useEffect(() => {
    const changeShow = setInterval(() => {
      setShow((prev) => {
        if (prev == 2) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);
    return () => clearTimeout(changeShow);
  }, []);*/

  useEffect(() => {
    console.log(program);
  }, [program]);

  const programPlace = useCallback(() => {
    switch (show) {
      case 0:
        return (
          <>
            <div className="w-60 text-3xl font-bold grid place-items-center">
              ホール
            </div>
            {program.hall[0] &&
              program.hall[0]
                .slice(0 + progress, 3 + progress)
                .map((program, index) => {
                  return (
                    <Live key={index} now={index == 0}>
                      {program.title}
                    </Live>
                  );
                })}
          </>
        );
      case 1:
        return (
          <>
            <div className="w-60 text-3xl font-bold grid place-items-center">
              体育館
            </div>
            {program.arena[0] &&
              program.arena[0].map((program, index) => {
                return (
                  <Live key={index} now={index == 0}>
                    {program.title}
                  </Live>
                );
              })}
          </>
        );
      case 2:
        return (
          <>
            <div className="w-60 text-3xl font-bold grid place-items-center">
              被覆室
            </div>
            {program.clothing[0] &&
              program.clothing[0].map((program, index) => {
                return (
                  <Live key={index} now={index == 0}>
                    {program.title}
                  </Live>
                );
              })}
          </>
        );
      default:
        return <div />;
    }
  }, [show, program, progress]);

  return (
    <>
      <div className="science-hall flex flex-1">{programPlace()}</div>

      <div className="time h-12 flex">
        <div className="w-60 Now flex">
          <div className="w-16 h-12  bg-yellow-800" />
          <div className="w-20 h-12  bg-yellow-700" />
          <div className="w-28 h-12  bg-yellow-600" />
          <div className="w-36 h-12 bg-yellow-500" />
          <div className="w-48 h-12  bg-amber-400" />
          <div className="w-64 h-12  bg-amber-200" />
        </div>
        <div className="now w-[45rem] ">
          上演中 ~ {program.hall[0] && program.hall[0][progress + 1].end}
        </div>
        <div className="upcoming w-60">
          <span className="font-bold pr-4">次</span>
          <span className="font-semibold text-[32px]">
            {program.hall[0] && program.hall[0][progress + 1].start}
          </span>
        </div>
        <div className="w-60 third-show">
          {program.hall[0] ? program.hall[0][progress + 2].start : "aa"}
        </div>
      </div>
    </>
  );
}
