import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChatContext,
  ChatContextType,
} from "../../../../../../providers/ChatContext";
import { Header } from "./components/Header";
import { MessageList } from "./components/MessageList";
import { Input } from "./components/Input";
import { GroupInterface } from "../../../../interfaces/Group.interface";
import Group from "../../../../services/Group";
import { UserInterface } from "../../../../interfaces/User.interface";
import User from "../../../../services/User";
import Message from "../../../../services/Message";
import { MessageObjectInterface } from "./interfaces/MessageObject.interface";

interface Props {
  isGroup: boolean;
  identifier: string;
}

export const Content: React.FC<Props> = ({
  isGroup = false,
  identifier = "",
}) => {
  const { accessToken, updateAccessToken, userInformation, socket } = useContext(
    ChatContext
  ) as ChatContextType;

  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<GroupInterface | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [messages, setMessages] = useState<{ _id?: String, text: string; sender: "sender" | "receiver" }[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
    const callToApi = async () => {
      setIsLoading(true);
      try {
        if (isGroup) {
          const group = await Group.getGroup(
            accessToken,
            updateAccessToken,
            identifier
          );
          setGroup(group);
        } else {
          const user = await User.getUser(
            accessToken,
            updateAccessToken,
            identifier
          );
          setUser(user);

          const responseMessages = await Message.getMessageUser(
            accessToken,
            updateAccessToken,
            identifier
          );
          setMessages(responseMessages.map((message) => ({
            id: message._id,
            text: message.message,
            sender: message.senderId._id === userInformation?._id ? "sender" : "receiver",
          })));
        }
      } catch (error) {
        navigate("/chat");
      } finally {
        setIsLoading(false);
      }
    };
    callToApi();
  }, [isGroup, identifier]);

  useEffect(() => {
    const handleNewMessage = (data: any) => {
      if (data.senderId === user?._id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, sender: "receiver" },
        ]);
      }
    };
  
    socket.on("newMessage", handleNewMessage);
  
    return () => {
      socket.off("newMessage", handleNewMessage); // Limpiar para evitar duplicados
    };
  }, [user?._id]);

  const handleSend = (text: string) => {
    const messageObject: MessageObjectInterface = {
      message: text,
      senderId: userInformation?._id as string,
    }
    if(isGroup) {
      messageObject.groupId = group?._id;
    } else {
      messageObject.receiverId = user?._id;
    }
    socket.emit("sendMessage", messageObject);
    setMessages([...messages, { text, sender: "sender" }]);
  };

  return (
    <div className="w-full h-full h-screen flex flex-col border rounded shadow-md">
      <Header isLoading={isLoading} group={group} user={user} />
      <MessageList messages={messages} isLoading={isLoading} />
      <Input onSend={handleSend} />
    </div>
  );
};
