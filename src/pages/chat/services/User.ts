const API_URL = import.meta.env.VITE_API;
import Auth from "./Auth";
import { UserInterface } from "../interfaces/User.interface";

class UserService {
  async getMeInfo(
    accessToken: string | null,
    setAccessToken:  (token: string) => void
  ): Promise<UserInterface> {
    try {
      const config = {
        method: "get",
        url: `${API_URL}/api/v1/users/me`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const data = await Auth.authorizedRequest(config, setAccessToken) as UserInterface;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUser(
    accessToken: string | null,
    setAccessToken: (token: string) => void,
    userId: string
  ): Promise<UserInterface> {
    try {
      const config = {
        method: "get",
        url: `${API_URL}/api/v1/users/${userId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const data = await Auth.authorizedRequest(config, setAccessToken) as UserInterface;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async users(
    accessToken: string | null,
    setAccessToken: (token: string) => void
  ): Promise<UserInterface[]> {
    try {
      const config = {
        method: "get",
        url: `${API_URL}/api/v1/users`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const data = await Auth.authorizedRequest(config, setAccessToken) as UserInterface[];
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(
    accessToken: string | null,
    setAccessToken: (token: string) => void,
    data: any
  ) {
    try {
      const config = {
        method: "put",
        url: `${API_URL}/api/v1/users`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: data
      };
      return await Auth.authorizedRequest(config, setAccessToken);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();