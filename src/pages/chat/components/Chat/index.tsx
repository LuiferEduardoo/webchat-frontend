import Sidebar from "./Sidebar";
import Chat from "./Chat";

const ChatComponent = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto ">
        <Chat />
      </div>
    </div>
  );
}

export default ChatComponent;