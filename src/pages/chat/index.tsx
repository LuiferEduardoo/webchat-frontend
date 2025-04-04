import React from 'react';
import Sidebar from './components/Sidebar';
import ChatComponent from './components/Chat';
import { Route, Routes } from 'react-router-dom';

const Chat: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Routes>
        <Route path="/chat/*" element={<ChatComponent />} />
      </Routes>
    </div>
  );
};

export default Chat;