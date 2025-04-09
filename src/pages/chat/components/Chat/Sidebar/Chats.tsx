import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Skeleton, Avatar } from "@heroui/react";

import {
  ChatContext,
  ChatContextType,
} from "../../../../../providers/ChatContext";
import { SenderMessageInterface } from "../../../interfaces/Message.interface";
import MessageService from "../../../services/Message";
import { GroupInterface } from "../../../interfaces/Group.interface";
import GroupService from "../../../services/Group";

interface Props {
  isCollapsed: boolean;
}
const Chat: React.FC<Props> = ({ isCollapsed }) => {
  const { accessToken, updateAccessToken } = useContext(
    ChatContext
  ) as ChatContextType;
  const [isLoading, setIsLoading] = useState(true);
  const [userSendersMessages, setUserSendersMessages] = useState<
    SenderMessageInterface[]
  >([]);
  const [groups, setGroups] = useState<GroupInterface[]>([]);

  useEffect(() => {
    const fetchUserSendersMessages = async () => {
      try {
        setIsLoading(true);
        const sender = await MessageService.sendersMessages(
          accessToken,
          updateAccessToken
        );
        setUserSendersMessages(sender);
        const grups = await GroupService.meGroup(
          accessToken,
          updateAccessToken
        );
        setGroups(grups);
      } catch (error) {
        console.error("Error fetching user senders messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSendersMessages();
  }, []);
  return (
    <div className="flex flex-col gap-2 mt-4 flex-1 overflow-y-auto text-black">
      {isLoading
        ? [1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <Skeleton className="flex rounded-full w-12 h-12" />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              )}
            </div>
          ))
        : userSendersMessages.map((chat, index) => (
            <Link
              to={`/chat/${chat._id}`}
              key={index}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <Avatar
                src={
                  chat.picture ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    chat.name?.split(" ")[0] || "U"
                  )}&background=random&color=fff`
                }
              />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="font-medium text-">{chat.name.split(" ")[0]}</span>
                </div>
              )}
            </Link>
          ))}

      {!isLoading &&
        groups.map((group, index) => (
          <Link
            to={`/chat/group/${group._id}`}
            key={index}
            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <Avatar src="https://www.svgrepo.com/show/86044/group.svg" />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-medium text-">{group.name}</span>
                <span className="text-sm text-gray-500">
                  {group.description}
                </span>
              </div>
            )}
          </Link>
        ))}
    </div>
  );
};

export default Chat;
