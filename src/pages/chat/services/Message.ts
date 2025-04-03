const API_URL = import.meta.env.VITE_API;

import Auth from "./Auth";
import { SenderMessageInterface } from "../interfaces/Message.interface";

class MessageService {

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