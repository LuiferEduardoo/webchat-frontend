import { useContext, useState, useEffect } from "react";

import { FiUsers } from "react-icons/fi";
import {
  addToast,
  Input,
  Select,
  SelectItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";

import {
  ChatContext,
  ChatContextType,
} from "../../../../../providers/ChatContext";
import { UserInterface } from "../../../interfaces/User.interface";
import User from "../../../services/User";
import Group from "../../../services/Group";

interface ModalCreateGroupProps {
  isCollapsed: boolean;
}

const ModalCreateGroup: React.FC<ModalCreateGroupProps> = ({ isCollapsed }) => {
  const { accessToken, updateAccessToken, userInformation, setUpdateAllPage, socket } = useContext(
    ChatContext
  ) as ChatContextType;
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [members, setMembers] = useState<UserInterface[]>([]);
  const [data, setData] = useState({
    name: "",
    members: [] as string[], // Assuming members are stored as an array of IDs
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const data = await User.users(accessToken, updateAccessToken);
        setMembers(data.filter((user) => user._id !== userInformation?._id));
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleCreateGroup = async () => {
    try {
      setIsLoadingButton(true);
      await Group.createGroup(accessToken, updateAccessToken, data);
      const memberToJoin = [...members, userInformation?._id]
      memberToJoin.map((member) => {
        socket.emit("addUserToGroup", {
          groupId: member
        });
      });
      addToast({
        title: "Grupo creado",
        description: "Grupo creado correctamente",
        color: "success",
      });
      onClose();
      setUpdateAllPage(true);
    } catch (error) {
      addToast({
        title: "Error al crear el grupo",
        description: "No se pudo crear el grupo",
        color: "danger",
      });
    } finally {
      setIsLoadingButton(false);
      setData({ name: "", members: [] });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };

  const handleSelectChange = (selectedItems: string[]) => {
    setData((prevData) => ({
      ...prevData,
      members: selectedItems,
    }));
  };

  return (
    <>
      <Button onPress={onOpen} className="flex items-center gap-2">
        <FiUsers /> {!isCollapsed && "Nuevo Grupo"}
      </Button>
      <div className="flex flex-col gap-2 mt-4">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="w-96">
            <ModalHeader className="text-center text-black">
              Crear Grupo
            </ModalHeader>
            <ModalBody>
              <Input
                placeholder="Nombre del grupo"
                className="w-full"
                value={data.name}
                onChange={handleInputChange}
              />
              <Select
                placeholder="Seleccionar miembros"
                className="w-full"
                isLoading={isLoading}
                selectionMode="multiple"
                onSelectionChange={(selected) =>
                  handleSelectChange(Array.from(selected).map(String))
                }
              >
                {members.map((member) => (
                  <SelectItem
                    className="text-black"
                    key={member._id}
                    textValue={member.name}
                  >
                    {member.name}
                  </SelectItem>
                ))}
              </Select>
              <Button
                className="flex items-center gap-2"
                color="primary"
                onClick={handleCreateGroup}
                isLoading={isLoadingButton}
                isDisabled={data.name === "" || data.members.length === 0}
              >
                Crear Grupo
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default ModalCreateGroup;
