"use client";

import { useCallback, useEffect, useState } from "react";
import Live from "./Live";

export default function Index() {
  const [time, setTime] = useState(new Date());
  const [isBlink, setIsBlink] = useState(false);

  const blinking = useCallback(() => {
    setTime(new Date());
    setIsBlink((prev) => !prev);
  }, []);

  useEffect(() => {
    const clock = setInterval(blinking, 1000);
    return () => clearTimeout(clock);
  }, [blinking]);

  return (
    <div className="Display w-[1920px] h-[1080px] relative bg-slate-900">
      <img
        className="Image1 w-[1440px] h-[810px] left-0 top-0 absolute"
        src="https://via.placeholder.com/1440x810"
      />
      <div className="Clock w-[480px] h-[216px] left-[1440px] top-0 absolute text-center flex justify-center items-center">
        <div>
          <span className="text-white text-8xl font-medium pr-4">
            {time.getHours().toString().padStart(2, "0")}
            <span className={`${isBlink ? "text-transparent" : "text-white"}`}>
              :
            </span>
            {new Date().getMinutes().toString().padStart(2, "0")}
          </span>
          <span className="text-white text-4xl font-medium">
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
      <div className="Congestion w-[480px] h-[722px] px-8 left-[1440px] top-[324px] absolute flex-col justify-center items-start gap-4 inline-flex">
        <div className="Group1 w-[416px] h-[132px] relative bg-green-500 bg-opacity-10 rounded-lg flex-col justify-start items-start flex">
          <div className="4aaaaaaaaaa w-[232px] h-8 text-white text-2xl font-bold">
            1-4aaaaaaaaaa
          </div>
        </div>
        <div className="Group2 w-[416px] h-[131px] relative bg-sky-500 bg-opacity-10 rounded-lg flex-col justify-start items-start flex">
          <div className="4aaaaaaaaaa w-[232px] h-8 text-white text-2xl font-bold">
            1-4aaaaaaaaaa
          </div>
        </div>
        <div className="Group3 w-[416px] h-[132px] relative bg-yellow-400 bg-opacity-10 rounded-lg flex-col justify-start items-start flex">
          <div className="4aaaaaaaaaa w-[232px] h-8 text-white text-2xl font-bold">
            1-4aaaaaaaaaa
          </div>
        </div>
        <div className="Group4 w-[416px] h-[131px] relative bg-orange-600 bg-opacity-10 rounded-lg flex-col justify-start items-start flex">
          <div className="4aaaaaaaaaa w-[232px] h-8 text-white text-2xl font-bold">
            1-4aaaaaaaaaa
          </div>
        </div>
        <div className="Group5 w-[416px] h-[131px] relative bg-red-600 bg-opacity-10 rounded-lg flex-col justify-start items-start flex">
          <div className="4aaaaaaaaaa w-[232px] h-8 text-white text-2xl font-bold">
            1-4aaaaaaaaaa
          </div>
        </div>
      </div>
      <div className=" w-[480px] h-[108px] left-[1440px] top-[216px] absolute text-center text-white text-[40px] font-bold">
        混雑状況
      </div>
    </div>
  );
}
