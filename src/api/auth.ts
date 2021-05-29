import axios from 'axios';
import { API, RESPONSE } from '../constants/api';
import { SignInRequest, SignUpRequest } from '../interfaces';

interface SignInResponse {
  status: number;
  data: {
    message: string;
    accessToken: string;
  };
}

export const authAPI = {
  signUp: async ({ url, email, password, age }: SignUpRequest) => {
    try {
      const data = {
        email: email,
        password: password,
        age: age,
      };
      const response = await axios.post(`${url}/members`, data);

      if (response.status === 400) {
        throw new Error('이미 가입된 이메일입니다.');
      }

      if (response.status > 400) {
        throw new Error('회원가입에 실패하였습니다.');
      }

      return RESPONSE.SUCCESS;
    } catch (error) {
      return error.message ?? RESPONSE.FAILURE;
    }
  },

  signIn: async ({ email, password }: SignInRequest) => {
    try {
      const data = {
        email: email,
        password: password,
      };
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
