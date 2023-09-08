"use client";

import { useParams } from "next/navigation";

export default function Display() {
  const params = useParams();
  console.log(params);
  return (
    <div className="Display bg-slate-800 h-full p-8">
      <img src="/4.svg" className="w-full h-full -skew-x-[25deg]" />
    </div>
  );
}
