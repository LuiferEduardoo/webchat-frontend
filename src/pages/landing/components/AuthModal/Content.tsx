import React from "react";

import { Input, Button } from "@heroui/react";

interface Content {
  error: any;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  type: "login" | "register";
  handleSubmit: () => void;
  authToGoogle: () => void;
  isLoadingGoogle: boolean;
}

const Content: React.FC<Content> = ({
  error,
  isLoading,
  handleChange,
  isDisabled,
  type,
  handleSubmit,
  authToGoogle,
  isLoadingGoogle
}) => {
  return (
    <form className="space-y-4">
      <Button fullWidth onPress={authToGoogle} isDisabled={isLoading} isLoading={isLoadingGoogle}>
        <img src="https://img.clerk.com/static/google.svg?width=80 1x,https://img.clerk.com/static/google.svg?width=160 2x" />
        Continuar con Google
      </Button>

      <div className="flex items-center justify-center w-full">
        <div className="flex-1 border-t border-gray-500"></div>
        <span className="px-4 text-gray-300">0</span>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>
      {type === "register" && (
        <div className="pb-5">
          <Input
            isRequired
            fullWidth
            labelPlacement="outside"
            label="Nombre"
            name="name"
            placeholder="Ingresa tu nombre"
            type="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
      )}

      <div className="pb-5">
        <Input
          isRequired
          fullWidth
          labelPlacement="outside"
          label="Email"
          placeholder="Ingresa tu email"
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          isInvalid={error?.email ? true : false}
          errorMessage={error?.email || ""}
        />
      </div>

      <div className="pb-5">
        <Input
          isRequired
          fullWidth
          labelPlacement="outside"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          isInvalid={error?.password ? true : false}
          errorMessage={error?.password || ""}
        />
      </div>

      {type === "register" && (
        <div>
          <Input
            isRequired
            fullWidth
            labelPlacement="outside"
            label="Confirmar Contraseña"
            placeholder="Confirma tu contraseña"
            type="password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
            isInvalid={error?.confirmPassword ? true : false}
            errorMessage={error?.confirmPassword || ""}
          />
        </div>
      )}

      <div className="flex gap-4">
        <Button
          color="primary"
          type="submit"
          fullWidth
          isLoading={isLoading}
          isDisabled={isDisabled || isLoadingGoogle}
          onPress={handleSubmit}
        >
          {type === "login" ? "Ingresar" : "Registrarse"}
        </Button>
      </div>
    </form>
  );
};

export default Content;
