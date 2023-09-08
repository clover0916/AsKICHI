import clsx from "clsx";

export default function Live({
  children,
  now,
}: {
  children: React.ReactNode;
  now?: boolean;
}) {
  return (
    <div
      className={clsx(
        "text-xl font-bold grid place-items-center px-4 text-center",
        now ? "bg-slate-600/30 w-[45rem]" : "w-60"
      )}
    >
      {children}
    </div>
  );
}
