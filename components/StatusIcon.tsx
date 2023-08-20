import { BsFillPersonFill, BsPerson } from "react-icons/bs";

const StatusIcon = ({ status }: { status: number }) => {
  let iconComponent;

  switch (status) {
    case 0:
      iconComponent = <BsFillPersonFill size={20} />;
      break;
    case 1:
    case 2:
    case 3:
      iconComponent = <BsPerson size={20} />;
      break;
    case 4:
      iconComponent = <BsFillPersonFill size={20} />;
      break;
    default:
      iconComponent = null;
  }

  return iconComponent;
};

export default StatusIcon;
