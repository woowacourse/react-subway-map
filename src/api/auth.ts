import axios from 'axios';
import { API } from '../constants/api';
import { MESSAGE } from '../constants/constant';

interface SignUpRequest {
  url: string;
  email: string;
  password: string;
  age: string;
}

interface SignInRequest {
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
  signUp: async ({ url, ...data }: SignUpRequest) => {
    try {
      const response = await axios.post(`${url}/members`, data);

      if (response.status === 400) {
        throw new Error(MESSAGE.ERROR.REGISTERED_EMAIL);
      }

      if (response.status > 400) {
        throw new Error(MESSAGE.ERROR.REGISTER_FAILED);
      }

      return MESSAGE.SUCCESS.RESPONSE;
    } catch (error) {
      return error.message ?? MESSAGE.ERROR.RESPONSE;
    }
  },

  signIn: async (data: SignInRequest) => {
    try {
      const response: SignInResponse = await axios.post(API.SIGN_IN(), data);

      if (response.status > 400) {
        throw new Error(MESSAGE.ERROR.LOGIN_FAILED);
      }

      return { accessToken: response.data.accessToken };
    } catch (error) {
      return { error: error.message ?? MESSAGE.ERROR.RESPONSE };
    }
  },
};
