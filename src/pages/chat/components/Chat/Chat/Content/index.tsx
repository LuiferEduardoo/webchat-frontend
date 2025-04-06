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

interface Props {
  isGroup: boolean;
  identifier: string;
}

export const Content: React.FC<Props> = ({
  isGroup = false,
  identifier = "",
}) => {
  const { accessToken, updateAccessToken } = useContext(
    ChatContext
  ) as ChatContextType;

  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState<GroupInterface | null>(null);
  const [user, setUser] = useState<UserInterface | null>(null);

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
        }
      } catch (error) {
        navigate("/chat");
      } finally {
        setIsLoading(false);
      }
    };
    callToApi();
  }, [isGroup, identifier]);
  console.log("isGroup", isGroup);
  console.log("identifier", identifier);

  const [messages, setMessages] = useState<
  { text: string; sender: "sender" | "receiver" }[]
>([
  { text: "Hello! How may I help you?", sender: "receiver" },
  { text: "Hello!", sender: "sender" },
  { text: "How to turn off push notifications on mobile?", sender: "sender" },
  {
    text: "Go to Profile > Settings > Push notifications and switch to off. Simple as that.",
    sender: "receiver",
  },
]);

  const handleSend = (text: string) => {
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
