import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

import {Skeleton} from "@heroui/react";

import { ChatContext, ChatContextType } from "../../../../providers/ChatContext";
import { removeTokenCookie } from "../../../../services/token.service";

const OptionsBelow: React.FC = () => {
  const {userInformation, isLoading} = useContext(ChatContext) as ChatContextType;
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
          <img
            src={`${userInformation?.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}`}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
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
