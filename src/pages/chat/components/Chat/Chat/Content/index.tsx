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
import { MessageObjectInterface, MessageProps } from "./interfaces/MessageObject.interface";

interface Props {
  isGroup: boolean;
  identifier: string;
}

export const Content: React.FC<Props> = ({
  isGroup = false,
  identifier = "",
}) => {
  const { accessToken, updateAccessToken, userInformation, socket } =
    useContext(ChatContext) as ChatContextType;

  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<GroupInterface | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [messages, setMessages] = useState<
  MessageProps[]
  >([]);

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

          const responseMessages = await Message.getMessageGroup(
            accessToken,
            updateAccessToken,
            identifier
          );
          setMessages(
            responseMessages.map((message) => ({
              id: message._id,
              text: message.message,
              sender:
                message.senderId._id === userInformation?._id
                  ? "sender"
                  : "receiver",
              senderInformation: {
                _id: message.senderId._id,
                name: message.senderId.name,
                picture: message.senderId.picture,
              },
            }))
          );
          setUser(null);
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
          setMessages(
            responseMessages.map((message) => ({
              id: message._id,
              text: message.message,
              sender:
                message.senderId._id === userInformation?._id
                  ? "sender"
                  : "receiver",
            }))
          );
          setGroup(null);
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
      if (data.groupId === group?._id && data.senderId !== userInformation?._id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, senderInformation: {
            _id: data.senderId._id,
            name: data.senderId.name,
            picture: data.senderId.picture
          }, sender: "receiver" },
        ]);
      } else if (data.senderId === user?._id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, sender: "receiver" },
        ]);
      }
    };
  
    if (isGroup) {
      socket.on("newGroupMessage", handleNewMessage);
    } else {
      socket.on("newMessage", handleNewMessage);
    }
  
    return () => {
      if (isGroup) {
        socket.off("newGroupMessage", handleNewMessage);
      } else {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [user?._id, group?._id, isGroup]);
  

  const handleSend = (text: string) => {
    const messageObject: MessageObjectInterface = {
      message: text,
    };
    if (isGroup) {
      messageObject.groupId = group?._id;
      socket.emit("sendGroupMessage", messageObject);
    } else {
      messageObject.receiverId = user?._id;
      socket.emit("sendMessage", messageObject);
    }
    setMessages([...messages, { text, sender: "sender" }]);
  };

  return (
    <div className="w-full h-full h-screen flex flex-col border rounded shadow-md">
      <Header isLoading={isLoading} group={group} user={user} />
      <MessageList messages={messages} isLoading={isLoading} isGroup={isGroup} />
      <Input onSend={handleSend} />
    </div>
  );
};
