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

      return { success: true, data: null, message: MESSAGE.SUCCESS.RESPONSE };
    } catch (error) {
      return { success: false, data: null, message: error.message };
    }
  },

  signIn: async (data: SignInRequest) => {
    try {
      const response: SignInResponse = await axios.post(API.SIGN_IN(), data);

      if (response.status > 400) {
        throw new Error(MESSAGE.ERROR.LOGIN_FAILED);
      }

      return { success: true, data: { accessToken: response.data.accessToken }, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
    }
  },
};
