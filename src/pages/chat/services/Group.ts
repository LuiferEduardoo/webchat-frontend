const API_URL = import.meta.env.VITE_API;

import Auth from "./Auth";
import { GroupInterface } from "../interfaces/Group.interface";

class GroupService {

  async meGroup(
    accessToken: string | null,
    setAccessToken: (token: string) => void
  ): Promise<GroupInterface[]>
  {
    try {
      const config = {
        method: "get",
        url: `${API_URL}/api/v1/groups/me`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      };
      const data = await Auth.authorizedRequest(config, setAccessToken) as GroupInterface[];
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createGroup(
    accessToken: string | null,
    setAccessToken: (token: string) => void,
    data: {
      name: string;
      members: string[];
    }
  ){
    try {
      const config = {
        method: "post",
        url: `${API_URL}/api/v1/groups`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data
      };
      const response = await Auth.authorizedRequest(config, setAccessToken) as GroupInterface[];
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new GroupService();