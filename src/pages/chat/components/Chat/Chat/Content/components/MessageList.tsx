import { MessageProps } from "../interfaces/MessageObject.interface";
import { Message } from "./Message";

type Props = {
  messages: MessageProps[];
  isGroup?: boolean;
  isLoading?: boolean;
};

export const MessageList = ({ messages, isGroup }: Props) => (
  <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">

    {messages.map((msg, index) => (
      <Message key={index} message={msg} isGroup={isGroup} />
    ))}
  </div>
);
