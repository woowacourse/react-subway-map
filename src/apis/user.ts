import axios from "axios";

// TODO : axios 가 실패했을 때 response 에는 무엇이 담기는지 확인하기

export const requestAuth = {
  getUserInfo: async (token: string) => {
    const response = await axios.get("https://subway-pomo.kro.kr/members/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  },

  login: async (email: string, password: string) => {
    const response = await axios.post("https://subway-pomo.kro.kr/login/token", { email, password });

    const { accessToken } = response.data;

    return accessToken;
  },

  signup: async (email: string, password: string, age: number) => {
    const response = await axios.post("https://subway-pomo.kro.kr/members", { email, password, age });

    return response;
  },

  checkEmailValidation: async (email: string) => {
    const response = await axios.post("https://subway-pomo.kro.kr/members/check-validation", { email });
    const { message } = response.data;

    return message;
  },
};
