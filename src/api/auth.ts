import axios, { AxiosResponse } from 'axios';
import { API, API_RESULT } from '../constants/api';
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

      return Object.assign(API_RESULT.SUCCESS, { message: MESSAGE.SUCCESS.RESPONSE });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },

  signIn: async (data: SignInRequest) => {
    try {
      const response = await axios.post<{ accessToken: string }>(API.SIGN_IN(), data);

      if (response.status > 400) {
        throw new Error(MESSAGE.ERROR.LOGIN_FAILED);
      }

      return Object.assign(API_RESULT.SUCCESS, { data: { accessToken: response.data.accessToken } });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },
};
