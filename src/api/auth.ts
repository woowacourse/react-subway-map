import axios from 'axios';
import { API, RESPONSE } from '../constants/api';

interface SignUp {
  url: string;
  email: string;
  password: string;
  age: string;
}

interface SignIn {
  email: string;
  password: string;
}

interface SignInResponse {
  status: number;
  data: {
    message: string;
    accessToken: string;
  };
}
export const authAPI = {
  signUp: async ({ url, email, password, age }: SignUp) => {
    try {
      const data = {
        email: email,
        password: password,
        age: age,
      };
      const response = await axios.post(`${url}/members`, data);

      if (response.status >= 400) {
        throw new Error('회원가입에 실패하였습니다.');
      }

      return RESPONSE.SUCCESS;
    } catch (error) {
      return RESPONSE.FAILURE;
    }
  },

  signIn: async ({ email, password }: SignIn) => {
    const data = {
      email: email,
      password: password,
    };
    try {
      const response: SignInResponse = await axios.post(API.SIGN_IN(), data);
      if (!response.data.accessToken) {
        throw new Error('로그인에 실패하였습니다.');
      }
      return { accessToken: response.data.accessToken };
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },
};
