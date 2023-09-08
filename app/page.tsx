"use client";

import Group from "@/components/Group";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock } from "./Clock";
import Display from "./DIsplay";
import Program from "./Program";

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
  const [eventsCount, setEventsCount] = useState(0);
  const [newEvents, setNewEvents] = useState<Event[]>([]);
  const [oldEvents, setOldEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/count")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEventsCount(data.count);
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

  const groupVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div className="Display w-[1920px] h-[1080px] relative">
      <div className="w-[1440px] h-[810px] left-0 top-0 absolute">
        <Display />
      </div>
      <div className="Clock w-[480px] h-[216px] left-[1440px] top-0 absolute text-center flex justify-center items-center bg-slate-900">
        <Clock />
      </div>
      <div className="Timetable w-[1440px] h-[270px] left-0 top-[810px] absolute bg-slate-950 flex flex-col">
        <Program />
      </div>
      <div className=" w-[480px] h-[108px] left-[1440px] top-[216px] absolute text-center text-white text-[40px] font-bold bg-slate-900">
        混雑状況
      </div>
      <motion.div
        variants={{
          show: {
            transition: {
              delayChildren: 0.5,
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="Congestion w-[480px] h-[756px] px-8 pb-8 left-[1440px] top-[324px] absolute flex-col items-start gap-4 inline-flex bg-slate-900"
      >
        {newEvents.map((event) => (
          <motion.div key={event.id} variants={groupVariants}>
            <Group
              key={event.id}
              title={event.title}
              host={event.host}
              place={event.place}
              crowded={event.crowded}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
