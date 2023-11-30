import { api } from "../utils";

export function useMember() {
  async function createMember(jwtToken, jsonObj) {
    try {
      const config = {
        headers: {
          Authorization: jwtToken,
          "Content-Type": "application/json",
        },
      };
      const res = await api.post("/createMember", jsonObj, config);

      return res.data;
    } catch (e) {
      return e.response.data;
    }
  }

  return {
    createMember,
  };
}
