import React, { useContext } from "react";

import { ChatContext, ChatContextType } from "../../../providers/ChatContext";
import { Avatar } from "@heroui/react";

import Form from "./Form";

const Profile: React.FC = () => {
  const { userInformation } = useContext(ChatContext) as ChatContextType;

  return (
    <div className="p-10">
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      <Avatar
      src={
        userInformation?.picture ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
        userInformation?.name?.split(" ")[0] || "U"
        )}&background=random&color=fff`
      }
      className="w-[15rem] h-[15rem] mb-4"
      />
      </div>
      <Form />
    </div>
  );
};

export default Profile;
