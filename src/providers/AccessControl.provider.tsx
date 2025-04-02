import React, { useContext } from "react";

import { AuthContext } from "./AuthContext.provider";
import { ChatProvider } from "./ChatContext";
import Landing from "../pages/landing";
import Chat from "../pages/chat";

interface AccessControl {
  redirectPath?: string;
}

const AccessControl: React.FC<AccessControl> = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { accessToken } = authContext;

  return accessToken ? (
    <ChatProvider>
      <Chat />
    </ChatProvider>
  ) : (
    <Landing />
  );
};

export default AccessControl;
