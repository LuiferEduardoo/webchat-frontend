import axios, { AxiosError } from "axios";
import { removeTokenCookie } from "../../../services/token.service";

class Auth {
  async authorizedRequest(
    config: any,
    setAccessToken: (token: string) => void
  ) {
    try {
      const response = await axios(config);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        removeTokenCookie("access_token");
        setAccessToken("");
      }
      throw error;
    }
  }
}

export default new Auth();