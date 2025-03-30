import React, { useContext } from "react";

import { AuthContext } from "./AuthContext.provider";
import Landing from "../pages/landing";

interface AccessControl {
  redirectPath?: string;
}

const AccessControl: React.FC<AccessControl> = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { accessToken } = authContext;


  return accessToken ? < ></> : <Landing/>;
};

export default AccessControl;