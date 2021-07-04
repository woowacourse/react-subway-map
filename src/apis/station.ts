import axios from 'axios';

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/messages';
import STATUS_CODE from '../constants/statusCode';
import { getAccessToken } from '../constants/storage';
import { unauthorizedDeleteResult, unauthorizedPostResult } from './sharedResults';
import {
  APIReturnType,
  RequestTypeStation,
  ResponseTypeStation,
  RestReturnTypeDelete,
  RestReturnTypePost,
} from './types';

const stationAPI = {
  get: async (): Promise<APIReturnType<ResponseTypeStation[] | null>> => {
    try {
      const { status, data } = await axios.get('/stations');

      if (status !== STATUS_CODE.OK) {
        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

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

  post: async (data: RequestTypeStation): Promise<APIReturnType<RestReturnTypePost | null>> => {
    const accessToken = getAccessToken();

    try {
      if (!accessToken) {
        return unauthorizedPostResult;
      }

      const { status } = await axios.post('/stations', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (status !== STATUS_CODE.CREATED) {
        if (status === STATUS_CODE.UNAUTHORIZED) {
          return unauthorizedPostResult;
        } else if (status === STATUS_CODE.BAD_REQUEST) {
          return {
            isSucceeded: false,
            message: ERROR_MESSAGE.DUPLICATED_STATION_NAME,
            result: {
              auth: true,
              duplicated: true,
            },
          };
        }

        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.ADD_STATION,
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

  delete: async (stationId: number): Promise<APIReturnType<RestReturnTypeDelete | null>> => {
    const accessToken = getAccessToken();

    try {
      if (!accessToken) {
        console.log('no accessToken');
        return unauthorizedDeleteResult;
      }

      const { status } = await axios.delete(`/stations/${stationId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (status !== STATUS_CODE.NO_CONTENT) {
        if (status === STATUS_CODE.UNAUTHORIZED) {
          console.log('hey');
          return unauthorizedDeleteResult;
        }

        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.DELETE_STATION,
        result: null,
      };
    } catch (error) {
      console.error(error);

      if (error.response.status === STATUS_CODE.BAD_REQUEST) {
        return {
          isSucceeded: false,
          message: ERROR_MESSAGE.STATION_IN_SECTION,
          result: null,
        };
      }

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.DEFAULT,
        result: null,
      };
    }
  },
};

export default stationAPI;
