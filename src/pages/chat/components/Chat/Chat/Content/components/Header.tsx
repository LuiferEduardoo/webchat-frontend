import { Skeleton } from "@heroui/react";

import { GroupInterface } from "../../../../../interfaces/Group.interface";
import { UserInterface } from "../../../../../interfaces/User.interface";

interface Props {
  isLoading: boolean;
  group: GroupInterface | null;
  user: UserInterface | null;
}

export const Header:React.FC<Props> = ({
  isLoading,
  group,
  user ,
}) => {
  return (
    <div className="bg-white border-b px-4 py-2 font-semibold text-sm text-black">
      {isLoading ? (
         <Skeleton className="w-3/5 rounded-lg">
         <div className="h-3 w-3/5 rounded-lg bg-default-200" />
       </Skeleton>
      ) : (
        <span>
          {group ? group.name : user ? user.name : "Chat"}
        </span>
      )}
    </div>
  );
};
