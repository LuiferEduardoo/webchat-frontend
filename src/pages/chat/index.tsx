import React, { useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { addToast } from "@heroui/react";

import Sidebar from "./components/Sidebar";
import ChatComponent from "./components/Chat";
import Profile from "./profile";
import { ChatContext, ChatContextType } from "../../providers/ChatContext";
import User from "./services/User";
import Group from "./services/Group";

const Chat: React.FC = () => {
  const { socket, accessToken, updateAccessToken } = useContext(
    ChatContext
  ) as ChatContextType;

  useEffect(() => {
    const setupMessageListeners = async () => {
      try {
        const isChatInGroup = window.location.pathname.includes("chat/group");

        const emitSound = () => {
          const audio = new Audio("/notification-sound.mp3");
          audio.play().catch((error) => {
            console.error("Error playing sound:", error);
          });
        };
        const handleNewGroupMessage = async (data: any) => {
          const group = await Group.getGroup(
            accessToken,
            updateAccessToken,
            data.groupId
          );
          if (
            !isChatInGroup &&
            data.groupId !==
              window.location.pathname
                .split("/chat/group/")
                .pop()
                ?.split("/")[0]
          ) {
            addToast({
              title: `Nuevo mensaje del grupo ${group.name}`,
              description:
                data.message.length > 100
                  ? `${data.message.substring(0, 100)}...`
                  : data.message,
              color: "primary",
            });
            emitSound();
          }
        };

        const handleNewMessage = async (data: any) => {
          if (
            data.senderId !==
            window.location.pathname.split("/chat/").pop()?.split("/")[0]
          ) {
            const user = await User.getUser(
              accessToken,
              updateAccessToken,
              data.senderId
            );
            addToast({
              title: `Nuevo mensaje de ${user.name}`,
              description:
                data.message.length > 100
                  ? `${data.message.substring(0, 100)}...`
                  : data.message,
              color: "primary",
            });
            emitSound();
          }
        };

        socket.on("newGroupMessage", handleNewGroupMessage);
        socket.on("newMessage", handleNewMessage);

        // 🧹 Limpiar listeners al desmontar o antes de volver a agregar
        return () => {
          socket.off("newGroupMessage", handleNewGroupMessage);
          socket.off("newMessage", handleNewMessage);
        };
      } catch (error) {
        console.error("Error setting up socket listeners:", error);
      }
    };

    setupMessageListeners();
  }, [accessToken, updateAccessToken]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 h-screen overflow-auto">
        <Routes>
          <Route path="/chat/*" element={<ChatComponent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Chat;
