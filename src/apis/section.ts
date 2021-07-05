import axios from 'axios';

import { APIReturnType, RequestTypeSection, RestReturnType, RestReturnTypeDelete } from './types';
import { getAccessToken } from '../constants/storage';
import STATUS_CODE from '../constants/statusCode';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../constants/messages';
import { unauthorizedDeleteResult, unauthorizedResult } from './sharedResults';

const sectionAPI = {
  post: async (
    lineId: number,
    data: RequestTypeSection
  ): Promise<APIReturnType<RestReturnType | null>> => {
    const accessToken = getAccessToken();

    try {
      if (!accessToken) {
        return unauthorizedResult;
      }

      await axios.post(`/lines/${lineId}/sections`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.ADD_SECTION,
        result: null,
      };
    } catch (error) {
      console.error(error);

      if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
        return unauthorizedResult;
      }

      return {
        isSucceeded: true,
        message: ERROR_MESSAGE.DEFAULT,
        result: null,
      };
    }
  },

  delete: async (
    lineId: number,
    stationId: number
  ): Promise<APIReturnType<RestReturnTypeDelete | null>> => {
    const accessToken = getAccessToken();

    try {
      if (!accessToken) {
        return unauthorizedDeleteResult;
      }

      const { status } = await axios.delete(`/lines/${lineId}/sections?stationId=${stationId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (status !== STATUS_CODE.NO_CONTENT) {
        if (status === STATUS_CODE.UNAUTHORIZED) {
          return unauthorizedDeleteResult;
        }

        throw new Error(ERROR_MESSAGE.API_CALL(status));
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.DELETE_LINE,
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

export default sectionAPI;
