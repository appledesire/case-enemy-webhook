import { api } from "../utils";

export function useAuth() {
  async function getToken(data) {
    try {
      const res = await api.post("/authen", data);

      return res.data;
    } catch (e) {
      return e.response.data;
    }
  }

  async function getSignature() {
    try {
      const res = await api.get("/clientSignature");

      return res.data;
    } catch (e) {
      return e.response.data;
    }
  }

  return {
    getToken,
    getSignature
  };
}
