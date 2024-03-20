"use client";

import { useEffect, useRef, useState } from "react";

const Video = () => {
  const [playingVideo, setPlayingVideo] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoList = [
    {
      src: "https://github.com/clover0916/AsKICHI/raw/main/video/%E6%96%87%E5%8C%96%E7%A5%AD%E7%94%9F%E5%BE%92%E4%BC%9ACM%20%E7%9C%9F%E9%9D%A2%E7%9B%AE%20-%20%E3%81%82%E3%82%81%E3%81%98%E3%82%85%E3%83%BC.mov",
      type: "video/mp4",
    },
    {
      src: "https://github.com/clover0916/AsKICHI/raw/main/video/%E6%96%87%E5%8C%96%E7%A5%AD%E7%94%9F%E5%BE%92%E4%BC%9ACM%20%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%95%E3%82%9A%E3%83%A9%E3%83%AA%E3%83%BC%20-%20%E3%81%82%E3%82%81%E3%81%98%E3%82%85%E3%83%BC.mov",
      type: "video/mp4",
    },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoList[playingVideo].src;
      if (playing) {
        videoRef.current.play();
      }
    }
    console.log(playingVideo, playing);
  }, [playingVideo, playing]);

  const handleVIdeoEnded = () => {
    setPlayingVideo((prev) => (prev + 1) % videoList.length);
  };

  return (
    <div>
      {!playing && <button onClick={() => setPlaying(true)}>Play</button>}
      <video ref={videoRef} onEnded={handleVIdeoEnded}>
        <source
          src={videoList[playingVideo].src}
          type={videoList[playingVideo].type}
        />
      </video>
    </div>
  );
};

export default Video;
