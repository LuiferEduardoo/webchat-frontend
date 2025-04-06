// import { Skeleton } from "@heroui/react";

import { Message } from "./Message";

type Props = {
  messages: { text: string; sender: 'sender' | 'receiver' }[];
  isLoading?: boolean;
};

export const MessageList = ({ messages }: Props) => (
  <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50">

    {messages.map((msg, index) => (
      <Message key={index} text={msg.text} sender={msg.sender} />
    ))}
  </div>
);
