"use client";

import Group from "@/components/Group";
import { useCallback, useEffect, useState } from "react";
import Live from "./Live";

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

export default function Index() {
  const [time, setTime] = useState(new Date());
  const [isBlink, setIsBlink] = useState(false);
  const [eventsCount, setEventsCount] = useState(0);
  const [newEvents, setNewEvents] = useState<Event[]>([]);
  const [oldEvents, setOldEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);

  const blinking = useCallback(() => {
    setTime(new Date());
    setIsBlink((prev) => !prev);
  }, []);

  useEffect(() => {
    const clock = setInterval(blinking, 1000);
    return () => clearTimeout(clock);
  }, [blinking]);

  useEffect(() => {
    fetch("/api/count")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEventsCount(data.count);
        fetch(`/api/now?page=${page}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setNewEvents(data);
          });
      });
  }, []);

  useEffect(() => {
    const getNewEvents = setInterval(() => {
      console.log(page * 5, eventsCount);
      if (page * 5 >= eventsCount) {
        setPage(1);
        return;
      } else {
        setPage((prev) => prev + 1);
      }
    }, 10000);
    return () => clearTimeout(getNewEvents);
  }, [eventsCount, page]);

  useEffect(() => {
    fetch(`/api/now?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNewEvents(data);
      });
  }, [page]);

  return (
    <div className="Display w-[1920px] h-[1080px] relative bg-slate-900">
      <img
        className="Image1 w-[1440px] h-[810px] left-0 top-0 absolute"
        src="https://www.metro.ed.jp/tamakagakugijutsu-h/img_sub/facility_img2.jpg"
      />
      <div className="information left-0 bottom-[270px] absolute bg-slate-900/50 p-8 pr-16 flex flex-col backdrop-blur-md">
        <span className="text-4xl font-bold">あいうABCabc123</span>
        <span className="text-3xl mb-2">1-4</span>
        <span className="text-2xl">
          あいうABCabc123あいうABCabc123あいうABCabc123
        </span>
      </div>
      <div className="ad right-[480px] bottom-[270px] absolute bg-slate-900/50  flex flex-col backdrop-blur-md">
        <div className="ad-content p-6 px-16">
          <span className="text-3xl font-bold">広告</span>
        </div>
      </div>
      <div className="Clock w-[480px] h-[216px] left-[1440px] top-0 absolute text-center flex justify-center items-center">
        <div>
          <span className="text-8xl font-medium pr-4">
            {time.getHours().toString().padStart(2, "0")}
            <span className={`${isBlink ? "text-transparent" : ""}`}>:</span>
            {new Date().getMinutes().toString().padStart(2, "0")}
          </span>
          <span className="text-4xl font-medium">
            {
              new Date()
                .toLocaleString("en-US", {
                  hour: "numeric",
                  hour12: true,
                })
                .split(" ")[1]
            }
          </span>
        </div>
      </div>
      <div className="Timetable w-[1440px] h-[270px] left-0 top-[810px] absolute bg-slate-950 flex flex-col">
        <div className="science-hall flex flex-1">
          <div className="w-60 text-3xl font-bold grid place-items-center">
            ホール
          </div>
          <Live now>ムーラン・ルージュ！ザ・ミュージカル</Live>
          <Live>SHINE SHOW！</Live>
          <Live>ミュージカル『生きる』</Live>
          <Live>DREAM BOYS</Live>
          <Live>aaa</Live>
        </div>

        <div className="time h-12 flex">
          <div className="w-60 Now flex">
            <div className="w-16 h-12  bg-yellow-800" />
            <div className="w-20 h-12  bg-yellow-700" />
            <div className="w-28 h-12  bg-yellow-600" />
            <div className="w-36 h-12 bg-yellow-500" />
            <div className="w-48 h-12  bg-amber-400" />
            <div className="w-64 h-12  bg-amber-200" />
          </div>
          <div className="now w-60">上演中</div>
          <div className="upcoming w-60">
            <span className="font-bold pr-4">次</span>
            <span className="font-semibold text-[32px]">9:30</span>
          </div>
          <div className="w-60 third-show">10:00</div>
          <div className="w-60 fourth-show">10:30</div>
          <div className="w-60 fifth-show">11:00</div>
        </div>

        <div className="arena flex flex-1">
          <div className="w-60 text-3xl font-bold grid place-items-center">
            アリーナ
          </div>
          <Live now>ムーラン・ルージュ！ザ・ミュージカル</Live>
          <Live>SHINE SHOW！</Live>
          <Live>ミュージカル『生きる』</Live>
          <Live>DREAM BOYS</Live>
          <Live>aaa</Live>
        </div>
      </div>
      <div className=" w-[480px] h-[108px] left-[1440px] top-[216px] absolute text-center text-white text-[40px] font-bold">
        混雑状況
      </div>
      <div className="Congestion w-[480px] h-[722px] px-8 left-[1440px] top-[324px] absolute flex-col items-start gap-4 inline-flex">
        {newEvents &&
          newEvents.map((event) => (
            <Group
              key={event.id}
              title={event.title}
              host={event.host}
              place={event.place}
              crowded={event.crowded}
            />
          ))}
      </div>
    </div>
  );
}
