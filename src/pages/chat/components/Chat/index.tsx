import Sidebar from "./Sidebar";

const Chat = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto ">
      </div>
    </div>
  );
}

export default Chat;