const API_URL = import.meta.env.VITE_API;

import Auth from "./Auth";
import { SenderMessageInterface, MessageInterface } from "../interfaces/Message.interface";

class MessageService {

  async getMessageUser(
    accessToken: string | null,
    setAccessToken: (token: string) => void,
    userId: string
  ): Promise<MessageInterface[]> {
    try {
      const config = {
        method: "get",
        url: `${API_URL}/api/v1/messages/users/${userId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      };
      const data = await Auth.authorizedRequest(config, setAccessToken) as MessageInterface[];
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMessageGroup(
    accessToken: string | null,
    setAccessToken: (token: string) => void,
    groupId: string
  ): Promise<MessageInterface[]> {
    try {
      const config = {
        method: "get",
        url: `${API_URL}/api/v1/messages/groups/${groupId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      };
      const data = await Auth.authorizedRequest(config, setAccessToken) as MessageInterface[];
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  async sendersMessages(
    accessToken: string | null,
    setAccessToken: (token: string) => void
  ): Promise<SenderMessageInterface[]>
  {
    try {
      const config = {
        method: "get",
        url: `${API_URL}/api/v1/messages/senders`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      };
      const data = await Auth.authorizedRequest(config, setAccessToken) as SenderMessageInterface[];
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default new MessageService();