import { Avatar } from "@heroui/react";

import { MessageProps } from "../interfaces/MessageObject.interface";

type Props = {
  message: MessageProps;
  isGroup?: boolean;
};

export const Message =  ({ message, isGroup }: Props) => {
  const isReceiver = message.sender === "receiver";
  return (
    <div className={`flex ${isReceiver ? "justify-start" : "justify-end"}`}>
      {isGroup && isReceiver && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden mt-1">
        <Avatar
          src={message.senderInformation?.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(
            message?.senderInformation?.name?.split(" ")[0] || "U"
          )}&background=random&color=fff`}
          alt={message.senderInformation?.name || "Sender"}
          className="h-full w-full object-cover"
        />
      </div>
      )}
      <div className={`flex flex-col ${isReceiver ? "ml-2" : "mr-2"}`}>
          {/* Mostrar nombre si es grupo */}
          {isGroup && isReceiver && (
            <span className={`text-xs ${isReceiver ? "text-left" : "text-right"} text-gray-600 mb-1`}>
              {message.senderInformation?.name}
            </span>
          )}
          
          {/* Contenedor del mensaje */}
          <div
            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
              isReceiver
                ? "bg-gray-200 text-gray-900"
                : "bg-blue-600 text-white"
            }`}
          >
            {message.text}
          </div>
        </div>
    </div>
  );
}