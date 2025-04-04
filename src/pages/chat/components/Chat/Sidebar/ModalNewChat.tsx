import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FiMessageSquare } from "react-icons/fi";
import {
  Skeleton,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
} from "@heroui/react";

import {
  ChatContext,
  ChatContextType,
} from "../../../../../providers/ChatContext";
import { UserInterface } from "../../../interfaces/User.interface";
import User from "../../../services/User";

interface ModalCreateGroupProps {
  isCollapsed: boolean;
}

const ModalNewChat: React.FC<ModalCreateGroupProps> = ({ isCollapsed }) => {
  const { accessToken, updateAccessToken, userInformation } = useContext(
    ChatContext
  ) as ChatContextType;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const data = await User.users(accessToken, updateAccessToken);
        setUsers(data.filter((user) => user._id !== userInformation?._id));
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <>
      <Button className="flex items-center gap-2" onClick={onOpen}>
        <FiMessageSquare /> {!isCollapsed && "Nuevo Chat"}
      </Button>
      <div className="flex flex-col gap-2 mt-4">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="w-96">
            <ModalHeader className="text-center text-black">
              Agregar nueva persona
            </ModalHeader>
            <ModalBody>
              {isLoading
                ? [1, 2, 3, 4, 5].map((index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <Skeleton className="flex rounded-full w-12 h-12" />
                      {!isCollapsed && (
                        <div className="flex flex-col">
                          <Skeleton className="h-3 w-3/5 rounded-lg" />
                          <Skeleton className="h-3 w-4/5 rounded-lg" />
                        </div>
                      )}
                    </div>
                  ))
                : users.map((user, index) => (
                    <Link
                      to={`/chat/${user._id}`}
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      <Avatar
                        src={
                          user.picture ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                      />

                      <div className="flex flex-col">
                        <span className="font-medium text-black">
                          {user.name}
                        </span>
                      </div>
                    </Link>
                  ))}
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={onOpenChange}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default ModalNewChat;
