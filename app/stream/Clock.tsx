"use client";

import { useCallback, useEffect, useState } from "react";

export function Clock() {
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
  );
}
