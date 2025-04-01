import React from "react";

import Content from "./Content";

interface AuthModalProps {
  onClose: () => void;
  type: "login" | "register";
}

const AuthModal: React.FC<AuthModalProps> = ({ type }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<any>({});
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError({ ...error, email: "Email no válido" });
        return;
      } else {
        setError(null);
      }
    }
    if (name === "password" && type === "register") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
      if (!passwordRegex.test(value)) {
        setError({
          ...error,
          password: "La contraseña debe tener al menos 8 caracteres un número y una letra mayúscula",
        });
        return;
      } else {
        setError(null);
      }
    }
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setError({ ...error, confirmPassword: "Las contraseñas no coinciden" });
        return;
      } else {
        setError(null);
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const isDisabled =
    Boolean(error?.email || error?.password || error?.confirmPassword) ||
    (type === "register"
      ? !formData?.name ||
        !formData?.email ||
        !formData?.password ||
        !formData?.confirmPassword
      : 
        !formData?.email || !formData?.password);
  
  return (
    <Content 
      type={type}
      isLoading={isLoading}
      error={error}
      handleChange={handleChange}
      isDisabled={isDisabled}
    />
  );
};

export default AuthModal;
