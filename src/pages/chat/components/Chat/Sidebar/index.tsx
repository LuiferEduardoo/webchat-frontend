import {useState } from "react";
import Header from "./Header";
import Buttons from "./Buttons";
import Chat from "./Chats";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`relative transition-all duration-300 ${isCollapsed ? "w-[100px]" : "w-72"} bg-gray-50 h-screen p-4 flex flex-col`}>  
      <Header 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
      />
      <Chat
        isCollapsed={isCollapsed}
      />
      
      <Buttons 
        isCollapsed={isCollapsed}
      />
    </div>
  );
};

export default Sidebar;
