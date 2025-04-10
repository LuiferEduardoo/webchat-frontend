import React, { useContext } from "react";

import { Input, Button } from "@heroui/react";

import {
  ChatContext,
  ChatContextType,
} from "../../../../providers/ChatContext";

interface Props {
  data: {
    name: string | undefined;
    email: string | undefined;
    username: string | undefined | null;
    currentPassword: string;
    newPassword: string;
  };
  setData: React.Dispatch<React.SetStateAction<any>>;
  error: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  handleSubmit: (e: any) => void;
}

const Content: React.FC<Props> = ({
  data,
  setData,
  error,
  setError,
  isLoading,
  handleSubmit,
}) => {
  const { userInformation } = useContext(ChatContext) as ChatContextType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Actualizamos primero los datos para tener el estado más reciente
    const updatedData = { ...data, [name]: value };
    setData(updatedData);

    // Validación de email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError({ ...error, email: "Email no válido" });
      } else {
        setError(null);
      }
    }

    // Validación de contraseñas
    if (name === "currentPassword" || name === "newPassword") {
      // Verificamos si alguno de los campos tiene contenido pero el otro está vacío
      const isCurrentEmpty = updatedData.currentPassword.trim() === "";
      const isNewEmpty = updatedData.newPassword.trim() === "";

      if ((!isCurrentEmpty && isNewEmpty) || (isCurrentEmpty && !isNewEmpty)) {
        setError({
          ...error,
          currentPassword: isCurrentEmpty
            ? "Este campo no puede estar vacío"
            : "",
          newPassword: isNewEmpty ? "Este campo no puede estar vacío" : "",
        });
      } else {
        // Si ambos están vacíos o ambos tienen contenido, limpiamos los errores
        if (error?.currentPassword || error?.newPassword) {
          setError({
            ...error,
            currentPassword: "",
            newPassword: "",
          });
        }
      }
    }

    // Validación de formato de nueva contraseña (solo si tiene contenido)
    if (name === "newPassword" && value.trim() !== "") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
      if (!passwordRegex.test(value)) {
        setError({
          ...error,
          newPassword:
            "La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un carácter especial",
        });
      } else if (error?.newPassword) {
        setError({
          ...error,
          newPassword: "",
        });
      }
    }
  };

  const isDisabled = Boolean(error?.email || error?.newPassword || error?.currentPassword);
  return (
    <form className="flex flex-col space-y-8">
      <Input
        type="text"
        name="name"
        labelPlacement="outside"
        label="Nombre"
        value={data.name}
        onChange={(e) => handleChange(e)}
        placeholder="Luifer Ortega"
      />
      <Input
        type="text"
        name="username"
        labelPlacement="outside"
        label="Nombre de usuario"
        value={data.username as string}
        onChange={(e) => handleChange(e)}
        placeholder="luifer_ortega"
      />
      <Input
        type="email"
        name="email"
        value={data.email}
        labelPlacement="outside"
        label="Correo"
        isDisabled={userInformation?.googleId ? true : false}
        onChange={(e) => handleChange(e)}
        placeholder="contacto@luifereduardoo.com"
        isInvalid={error?.email ? true : false}
        errorMessage={error?.email || ""}
      />

      <Input
        type="password"
        name="currentPassword"
        labelPlacement="outside"
        label="Contraseña actual"
        isDisabled={userInformation?.googleId ? true : false}
        value={data.currentPassword}
        onChange={(e) => handleChange(e)}
        placeholder="Ingresa tu contraseña actual"
        isInvalid={error?.currentPassword ? true : false}
        errorMessage={error?.currentPassword || ""}
      />
      <Input
        type="password"
        name="newPassword"
        labelPlacement="outside"
        label="Nueva contraseña"
        isDisabled={userInformation?.googleId ? true : false}
        value={data.newPassword}
        onChange={(e) => handleChange(e)}
        placeholder="Ingresa tu nueva contraseña"
        isInvalid={error?.newPassword ? true : false}
        errorMessage={error?.newPassword || ""}
      />

      <Button
        color="primary"
        type="submit"
        isDisabled={isDisabled}
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        Actualizar
      </Button>
    </form>
  );
};

export default Content;
