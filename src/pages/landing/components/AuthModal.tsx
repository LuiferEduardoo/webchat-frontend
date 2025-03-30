import React from "react";

import { Input, Button } from "@heroui/react";

interface AuthModalProps {
  onClose: () => void;
  type: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({ type }) => {
  return (
    <>
      <form className="space-y-4">
        <Button type="submit" fullWidth>
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
              placeholder="Ingresa tu nombre"
              type="name"
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
            />
          </div>
        )}

        <div className="flex gap-4">
          <Button color="primary" type="submit" fullWidth>
            {type === "login" ? "Ingresar" : "Registrarse"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AuthModal;
