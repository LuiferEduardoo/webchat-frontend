import React, { createContext, useState, ReactNode } from "react";

import { getTokenCookie } from "../services/token.service";

export interface AuthContextType {
  accessToken: string | null;
  setAccessToken: Function
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    getTokenCookie("access_token") || null
  );

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};