import Sidebar from "./Sidebar";
import Chat from "./Chat";

const ChatComponent = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex overflow-auto h-screen w-full">
        <Chat />
      </div>
    </div>
  );
}

export default ChatComponent;