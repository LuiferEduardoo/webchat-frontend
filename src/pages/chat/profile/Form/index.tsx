import React, { useContext, useState } from "react";

import { addToast } from "@heroui/react";

import { ChatContext, ChatContextType } from "../../../../providers/ChatContext";
import Content from "./Content";
import UserService from "../../services/User";

const Form = () => {
  const { accessToken, updateAccessToken, userInformation, setUpdateAllPage } = useContext(
    ChatContext
  ) as ChatContextType;
  const [data, setData] = useState<{ name: string | undefined; email: string | undefined; username: string | undefined | null, currentPassword: string, newPassword: string }>({
    name: userInformation?.name,
    username: userInformation?.username,
    email: userInformation?.email,
    currentPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    newPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const objectWithoutEmpty = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
      );
      await UserService.updateUser(accessToken, updateAccessToken, objectWithoutEmpty);
      setUpdateAllPage(true);
      addToast({
        title: "Actualización de perfil",
        description: "Perfil actualizado correctamente",
        color: "success",
      });
      setData({
        name: userInformation?.name,
        username: userInformation?.username,
        email: userInformation?.email,
        currentPassword: "",
        newPassword: ""});
    } catch (error) {
      addToast({
        title: "Error al actualizar el perfil",
        description: "No se pudo actualizar el perfil",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Content
      data={data}
      setData={setData}
      error={error}
      setError={setError}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
    />
  )
}

export default Form;