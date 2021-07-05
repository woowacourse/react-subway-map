import axios from 'axios';

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/messages';
import STATUS_CODE from '../constants/statusCode';
import { getAccessToken } from '../constants/storage';
import { unauthorizedDeleteResult, unauthorizedPostResult } from './sharedResults';
import {
  APIReturnType,
  RequestTypeLine,
  ResponseTypeLine,
  RestReturnTypeDelete,
  RestReturnTypePost,
} from './types';

const lineAPI = {
  get: async (): Promise<APIReturnType<ResponseTypeLine[] | null>> => {
    try {
      const { data } = await axios.get('/lines');

      return {
        isSucceeded: true,
        message: '',
        result: data,
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

  getOne: async (lineId: number): Promise<APIReturnType<ResponseTypeLine | null>> => {
    try {
      const { data } = await axios.get(`/lines/${lineId}`);

      return {
        isSucceeded: true,
        message: '',
        result: data,
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

  post: async (data: RequestTypeLine): Promise<APIReturnType<RestReturnTypePost | null>> => {
    const accessToken = getAccessToken();

    try {
      if (!accessToken) {
        return unauthorizedPostResult;
      }

      await axios.post('/lines', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.ADD_LINE,
        result: null,
      };
    } catch (error) {
      console.error(error);

      switch (error.response.status) {
        case STATUS_CODE.UNAUTHORIZED:
          return unauthorizedPostResult;

        case STATUS_CODE.BAD_REQUEST:
          return {
            isSucceeded: false,
            message: ERROR_MESSAGE.DUPLICATED_LINE_NAME,
            result: {
              auth: true,
              duplicated: true,
            },
          };
      }

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DEFAULT,
        result: null,
      };
    }
  },

  delete: async (lineId: number): Promise<APIReturnType<RestReturnTypeDelete | null>> => {
    const accessToken = getAccessToken();

    try {
      if (!accessToken) {
        return unauthorizedDeleteResult;
      }

      await axios.delete(`/lines/${lineId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.DELETE_STATION,
        result: null,
      };
    } catch (error) {
      console.error(error);

      if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
        return unauthorizedDeleteResult;
      }

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DEFAULT,
        result: null,
      };
    }
  },
};

export default lineAPI;
