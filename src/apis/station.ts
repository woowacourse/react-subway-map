import { request, REQUEST_URL } from '../request';
import ERROR_TYPE from '../constants/errorType';
import { ERROR_MESSAGE } from '../constants/messages';
import STATUS_CODE from '../constants/statusCode';

interface StationData {
  name: string;
}

interface APIResponseDataStation {
  id: number;
  name: string;
  lines?: {
    id: number;
    name: string;
    color: string;
  }[];
}

interface APIReturnTypeStation {
  ok: boolean;
  data?: APIResponseDataStation[];
  error?: { type: string; message: string };
}

const API = {
  get: async (): Promise<APIReturnTypeStation> => {
    try {
      const response = await request(`${REQUEST_URL}/stations`, {
        method: 'GET',
      });
      const json = await response.json();

      return { ok: true, data: json };
    } catch (error) {
      if (error.message === STATUS_CODE.INTERNAL_SERVER_ERROR) {
        return {
          ok: false,
          error: { type: ERROR_TYPE.INTERNAL_SERVER_ERROR, message: ERROR_MESSAGE.DEFAULT },
        };
      }

      return {
        ok: false,
        error: { type: ERROR_TYPE.INTERNAL_SERVER_ERROR, message: ERROR_MESSAGE.DEFAULT },
      };
    }
  },
  post: async (data: StationData, accessToken: string): Promise<APIReturnTypeStation> => {
    try {
      await request(`${REQUEST_URL}/stations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      return { ok: true };
    } catch (error) {
      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        return {
          ok: false,
          error: { type: ERROR_TYPE.UNAUTHORIZED, message: ERROR_MESSAGE.TOKEN_EXPIRED },
        };
      }

      if (error.message === STATUS_CODE.BAD_REQUEST) {
        return {
          ok: false,
          error: { type: ERROR_TYPE.DUPLICATED, message: ERROR_MESSAGE.DUPLICATED_STATION_NAME },
        };
      }

      return {
        ok: false,
        error: { type: ERROR_TYPE.INTERNAL_SERVER_ERROR, message: ERROR_MESSAGE.DEFAULT },
      };
    }
  },
  delete: async (stationId: number, accessToken: string): Promise<APIReturnTypeStation> => {
    try {
      await request(`${REQUEST_URL}/stations/${stationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { ok: true };
    } catch (error) {
      if (error.message === STATUS_CODE.UNAUTHORIZED) {
        return {
          ok: false,
          error: { type: ERROR_TYPE.UNAUTHORIZED, message: ERROR_MESSAGE.TOKEN_EXPIRED },
        };
      }

      if (error.message === STATUS_CODE.BAD_REQUEST) {
        return {
          ok: false,
          error: { type: ERROR_TYPE.STATION_IN_SECTION, message: ERROR_MESSAGE.STATION_IN_SECTION },
        };
      }

      return {
        ok: false,
        error: { type: ERROR_TYPE.INTERNAL_SERVER_ERROR, message: ERROR_MESSAGE.DEFAULT },
      };
    }
  },
};

export default API;
export type { StationData, APIResponseDataStation, APIReturnTypeStation };
