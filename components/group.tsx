import { BsFillPersonFill, BsPerson } from "react-icons/bs";

export default function Group({
  host,
  title,
  place,
  status,
}: {
  host: string;
  title: string;
  place: string;
  status?: number;
}) {
  return (
    <div className="flex flex-col justify-between shadow rounded bg-blue-100 overflow-hidden px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="inline-flex items-center gap-4">
          <h2 className="text-2xl font-bold">{host}</h2>
          <p className="text-xl">{place}</p>
        </div>
        <div className="flex">
          {status === 0 ? (
            <>
              <BsPerson size={20} />
              <BsPerson size={20} />
              <BsPerson size={20} />
              <BsPerson size={20} />
            </>
          ) : status === 1 ? (
            <>
              <BsFillPersonFill size={20} />
              <BsPerson size={20} />
              <BsPerson size={20} />
              <BsPerson size={20} />
            </>
          ) : status === 2 ? (
            <>
              <BsFillPersonFill size={20} />
              <BsFillPersonFill size={20} />
              <BsPerson size={20} />
              <BsPerson size={20} />
            </>
          ) : status === 3 ? (
            <>
              <BsFillPersonFill size={20} />
              <BsFillPersonFill size={20} />
              <BsFillPersonFill size={20} />
              <BsPerson size={20} />
            </>
          ) : (
            <>
              <BsFillPersonFill size={20} />
              <BsFillPersonFill size={20} />
              <BsFillPersonFill size={20} />
              <BsFillPersonFill size={20} />
            </>
          )}
        </div>
      </div>
      <p>{title}</p>
    </div>
  );
}
