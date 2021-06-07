import axios from "axios";

const requestAuth = {
  getUserInfo: async (token: string) => {
    const response = await axios.get("/members/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  },

  login: async (email: string, password: string) => {
    const response = await axios.post("/login/token", { email, password });
    const { accessToken } = response.data;

    return accessToken;
  },

  signup: async (email: string, password: string, age: number) => {
    const response = await axios.post("/members", { email, password, age });

    return response;
  },

  checkEmailValidation: async (email: string) => {
    const response = await axios.post("/members/check-validation", { email });
    const { message } = response.data;

    return message;
  },
};

export { requestAuth };
