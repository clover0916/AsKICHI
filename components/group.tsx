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
  status: number;
}) {
  const statusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-sky-50";
      case 1:
        return "bg-green-50";
      case 2:
        return "bg-yellow-50";
      case 3:
        return "bg-orange-50";
      case 4:
        return "bg-red-50";
      default:
        return "bg-sky-50";
    }
  };

  return (
    <div
      className={`flex flex-col justify-between shadow rounded overflow-hidden px-4 py-2 ${statusColor(
        status
      )}`}
    >
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
