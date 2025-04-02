import React from 'react';
import Sidebar from './components/Sidebar';

const Chat: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto ">
      </div>
    </div>
  );
};

export default Chat;