import axios from "axios";
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API;

class Auth {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
      throw new Error("Login failed");
    }
  }

  async register(name: string, email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw new Error("Registration failed");
    }
  }

  async google(): Promise<any> {
    try {
      window.location.href = `${API_URL}/api/v1/auth/google`;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Google login failed");
      }
      throw new Error("Google login failed");
    }
  }
}

export default new Auth();
