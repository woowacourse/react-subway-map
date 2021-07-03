import axios from 'axios';

import { ACCESS_TOKEN } from '../constants/storage';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/messages';
import STATUS_CODE from '../constants/statusCode';
import { APIReturnType, RequestTypeLogin, RequestTypeSignUp, ResponseTypeUser } from './types';

const userAPI = {
  getInfo: async (): Promise<APIReturnType<ResponseTypeUser | null>> => {
    try {
      if (!ACCESS_TOKEN) {
        throw new Error(ERROR_MESSAGE.NO_ACCESS_TOKEN);
      }

      const { status, data } = await axios.get('/members/me', {
        headers: {
          'Content-Type': `Bearer ${ACCESS_TOKEN}`,
        },
      });

      if (status !== STATUS_CODE.OK) {
        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.WELCOME,
        result: data,
      };
    } catch (error) {
      console.log(error);

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.UNAUTHORIZED,
        result: null,
      };
    }
  },

  checkEmailDuplicated: async (email: string): Promise<APIReturnType<boolean | null>> => {
    try {
      const { status, data } = await axios.get(`/members?email=${email}`);

      if (status !== STATUS_CODE.OK) {
        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

      return {
        isSucceeded: true,
        message: data ? SUCCESS_MESSAGE.AVAILABLE_EMAIL : ERROR_MESSAGE.DUPLICATED_EMAIL,
        result: data,
      };
    } catch (error) {
      console.error(error);

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.UNCHECKED_EMAIL,
        result: null,
      };
    }
  },

  login: async (loginInfo: RequestTypeLogin): Promise<APIReturnType<string>> => {
    try {
      const { status, data } = await axios.post('/login/token', loginInfo);

      if (status !== STATUS_CODE.OK) {
        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.LOGIN,
        result: data.accessToken,
      };
    } catch (error) {
      console.error(error);

      if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
        return {
          isSucceeded: false,
          message: ERROR_MESSAGE.LOGIN,
          result: '',
        };
      }

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DEFAULT,
        result: '',
      };
    }
  },

  signup: async (signUpInfo: RequestTypeSignUp): Promise<APIReturnType<null>> => {
    try {
      const { status } = await axios.post('members', signUpInfo);

      if (status !== STATUS_CODE.CREATED) {
        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.SIGNUP,
        result: null,
      };
    } catch (error) {
      console.error(error);

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DEFAULT,
        result: null,
      };
    }
  },
};

export default userAPI;
