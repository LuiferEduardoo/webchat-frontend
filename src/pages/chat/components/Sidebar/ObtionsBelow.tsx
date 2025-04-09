import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

import { Avatar, Skeleton } from "@heroui/react";

import {
  ChatContext,
  ChatContextType,
} from "../../../../providers/ChatContext";
import { removeTokenCookie } from "../../../../services/token.service";

const OptionsBelow: React.FC = () => {
  const { userInformation, isLoading } = useContext(
    ChatContext
  ) as ChatContextType;
  const handleLogout = () => {
    removeTokenCookie("access_token");
    window.location.reload();
  };
  return (
    <div className="mt-auto mb-1">
      <Link to="/profile">
        {isLoading ? (
          <Skeleton className="flex rounded-full w-12 h-12" />
        ) : (
          <Avatar
            src={
              userInformation?.picture ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                userInformation?.name?.split(" ")[0] || "U"
              )}&background=random&color=fff`
            }
          />
        )}
      </Link>

      <button
        className="relative flex items-center justify-center w-12 h-12 my-2 rounded-lg transition-all"
        onClick={handleLogout}
      >
        <CiLogout className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default OptionsBelow;
