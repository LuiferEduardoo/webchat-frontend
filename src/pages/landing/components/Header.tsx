import React, { useState } from "react";
import AuthModal from "./AuthModal";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authType, setAuthType] = useState<"login" | "register">("login");

  const openModal = (type: "login" | "register") => {
    onOpen();
    setAuthType(type);
  };

  return (
    <>
      <header className="bg-blue-700 text-white py-4 px-8 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Web Chat</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Button
                  onPress={() => openModal("register")}
                  className="px-4 py-2"
                >
                  Regístrate
                </Button>
              </li>
              <li>
                <Button onPress={() => openModal("login")} color="primary">
                  Iniciar Sesión
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Modal isOpen={isOpen} size="sm" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black items-center">
                {authType === "login" ? (
                  <h2 className="text-1xl font-bold">Iniciar Sesión</h2>
                ) : (
                  <h2 className="text-1xl font-bold">Registrarse</h2>
                )}
              </ModalHeader>
              <ModalBody>
                <AuthModal onClose={onClose} type={authType} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Header;
