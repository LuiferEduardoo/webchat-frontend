import React from 'react';
import Sidebar from './components/Sidebar';
import ChatComponent from './components/Chat';
import { Route, Routes, Navigate } from 'react-router-dom';

const Chat: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-hidden">
        <Routes>
          <Route path="/chat/*" element={<ChatComponent />} />
          <Route path="/profile" element={<></>} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Chat;
