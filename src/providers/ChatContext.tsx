import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import io from 'socket.io-client';
import {Skeleton} from "@heroui/react";

import { UserInterface } from "../pages/chat/interfaces/User.interface";
import UserService from "../pages/chat/services/User";
import { getTokenCookie, removeTokenCookie } from "../services/token.service";

export interface ChatContextType {
  accessToken: string | null;
  updateAccessToken: (newToken: string) => void;
  userInformation: UserInterface | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  updateAllPage: boolean;
  setUpdateAllPage: (loading: boolean) => void;
  socket: any;
}

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    getTokenCookie("access_token") || null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInformation, setUserInformation] = useState<UserInterface | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [updateAllPage, setUpdateAllPage] = useState(true);


  const updateAccessToken = (newToken: string) => {
    removeTokenCookie("access_token");
    setAccessToken(newToken);
  };

  useEffect(() => {
    const getInformationUser = async () => {
      try {
        const user = await UserService.getMeInfo(accessToken, updateAccessToken) as UserInterface;
        setUserInformation(user);
      } catch (error) {
          updateAccessToken('');
          window.location.reload();
      } finally {
        setIsLoading(false);
        setUpdateAllPage(false);
      }
    };
    getInformationUser();

    const socketConnection = io(import.meta.env.VITE_API, {
      transports: ['websocket'], // Usar solo websocket
      auth: { token: accessToken },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketConnection.on('connect', () => {
      console.log('Socket connected');
    });
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [accessToken, updateAllPage]);

  return (
    <ChatContext.Provider
      value={{ accessToken, updateAccessToken, userInformation, isLoading, setIsLoading, updateAllPage, setUpdateAllPage, socket }}
    >
      {isLoading ? (
        <Skeleton className="w-full h-full rounded-lg">
          <div className="w-full h-full rounded-lg bg-default-300" />
        </Skeleton>
      ) :
        children
      }
    </ChatContext.Provider>
  );
};