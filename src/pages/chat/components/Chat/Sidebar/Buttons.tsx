
import ModalCreateGroup from "./ModalCreateGroup";
import ModalNewChat from "./ModalNewChat";

interface Props {
  isCollapsed: boolean;
}

const Buttons: React.FC<Props> = ({ isCollapsed }) => {
  return (
    <div className="flex flex-col">
      <ModalNewChat isCollapsed={isCollapsed} />
      <ModalCreateGroup isCollapsed={isCollapsed} />
    </div>
  );
};

export default Buttons;
