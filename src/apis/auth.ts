import axios from "axios";
import { request } from "./request";

interface UserInfo {
  id: number;
  email: string;
  age: number;
}

interface AccessToken {
  accessToken: string;
}

const auth = {
  getUserInfo: (token: string) => {
    return request<UserInfo>("/members/me", {
      config: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
  },

  login: (email: string, password: string) => {
    return request<AccessToken>("/login/token", {
      method: "post",
      data: {
        email,
        password,
      },
    });
  },

  signup: (email: string, password: string, age: number) => {
    return request("/members", {
      method: "post",
      data: { email, password, age },
    });
  },

  checkEmailValidation: (email: string) => {
    return axios.post("/members/check-validation", {
      method: "post",
      data: { email },
    });
  },
};

export { auth };
