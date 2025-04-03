import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ isCollapsed, setIsCollapsed }) => {
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  return (
    <div>
      <div className="flex justify-between items-center">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold text-black">Chats</h2>
        )}
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-full text-black hover:bg-gray-200"
        >
          {isCollapsed ? (
            <FiChevronRight size={20} />
          ) : (
            <FiChevronLeft size={20} />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <input
          type="text"
          placeholder="Search"
          className="mt-4 p-2 w-full rounded-md border border-gray-300 text-black"
        />
      )}
    </div>
  );
};

export default Header;