import { FiMessageSquare, FiUsers } from "react-icons/fi";
import { Button } from "@heroui/react";

interface Props {
  isCollapsed: boolean;
}

const Buttons: React.FC<Props> = ({ isCollapsed }) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Button className="flex items-center gap-2">
        <FiMessageSquare /> {!isCollapsed && "Nuevo Chat"}
      </Button>
      <Button className="flex items-center gap-2">
        <FiUsers /> {!isCollapsed && "Nuevo Grupo"}
      </Button>
    </div>
  );
};

export default Buttons;