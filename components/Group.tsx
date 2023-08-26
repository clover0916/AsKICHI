import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsPerson, BsPersonFill } from "react-icons/bs";

type Props = {
  title: string;
  host: string;
  place: string;
  crowded: number;
};

const crowdedText = [
  "混んでいません",
  "それほど混んでいません",
  "混んでいます",
  "とても混んでいます",
  "満員です",
];

const crowdedColor = [
  "bg-green-500/10",
  "bg-sky-500/10",
  "bg-yellow-400/10",
  "bg-orange-600/10",
  "bg-red-600/10",
];

const crowdedIcons = (crouded: number) => {
  switch (crouded) {
    case 0:
      return (
        <>
          <BsPerson size={24} />
          <BsPerson size={24} />
          <BsPerson size={24} />
          <BsPerson size={24} />
        </>
      );
    case 1:
      return (
        <>
          <BsPersonFill size={24} />
          <BsPerson size={24} />
          <BsPerson size={24} />
          <BsPerson size={24} />
        </>
      );
    case 2:
      return (
        <>
          <BsPersonFill size={24} />
          <BsPersonFill size={24} />
          <BsPerson size={24} />
          <BsPerson size={24} />
        </>
      );
    case 3:
      return (
        <>
          <BsPersonFill size={24} />
          <BsPersonFill size={24} />
          <BsPersonFill size={24} />
          <BsPerson size={24} />
        </>
      );
    case 4:
      return (
        <>
          <BsPersonFill size={24} />
          <BsPersonFill size={24} />
          <BsPersonFill size={24} />
          <BsPersonFill size={24} />
        </>
      );
    default:
      return <>Error</>;
  }
};

export default function Group({ title, host, place, crowded }: Props) {
  const [isTextVisible, setIsTextVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(!isTextVisible);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isTextVisible]);

  return (
    <AnimatePresence>
      <div
        className={clsx(
          "Group1 w-[416px] h-[132px] relative rounded-lg p-4",
          crowdedColor[crowded]
        )}
      >
        <div className="text-2xl font-bold whitespace-nowrap overflow-ellipsis overflow-hidden">
          {title}
        </div>
        <div className="text-lg font-semibold">{host}</div>
        <div>{place}</div>
        <div className="absolute right-0 bottom-0 flex pb-3 pr-4 gap-2">
          <motion.div
            initial="hidden"
            animate={isTextVisible ? "visible" : "hidden"}
            variants={{
              hidden: {
                display: "none",
                opacity: 0,
              },
              visible: {
                display: "block",
                opacity: 1,
              },
            }}
          >
            {crowdedText[crowded]}
          </motion.div>
          <motion.div
            initial="hidden"
            animate={isTextVisible ? "hidden" : "visible"}
            variants={{
              hidden: {
                display: "none",
                opacity: 0,
              },
              visible: {
                display: "flex",
                opacity: 1,
              },
            }}
          >
            {crowdedIcons(crowded)}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
