import { request, REQUEST_URL } from '../request';
import ERROR_TYPE from '../constants/errorType';
import { ERROR_MESSAGE } from '../constants/messages';
import STATUS_CODE from '../constants/statusCode';

interface LineData {
  name: string;
  color: string;
  upStationId: number;
  downStationId: number;
  distance: number;
}
interface APIResponseDataLine {
  id: number;
  name: string;
  color: string;
  stations: {
    id: number;
    name: string;
    distance?: number;
  }[];
}

interface APIReturnTypeLine {
  ok: boolean;
  data?: APIResponseDataLine | APIResponseDataLine[];
  error?: { type: string; message: string };
}

const API = {
  get: async (): Promise<APIReturnTypeLine> => {
    try {
      const response = await request(`${REQUEST_URL}/lines`, {
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

  getLine: async (lineId: number): Promise<APIReturnTypeLine> => {
    try {
      const response = await request(`${REQUEST_URL}/lines/${lineId}`, {
        method: 'GET',
      });
      const json = await response.json();

      return { ok: true, data: json };
    } catch (error) {
      if (error.message === 500) {
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

  post: async (data: LineData, accessToken: string): Promise<APIReturnTypeLine> => {
    try {
      await request(`${REQUEST_URL}/lines`, {
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

      return {
        ok: false,
        error: { type: ERROR_TYPE.INTERNAL_SERVER_ERROR, message: ERROR_MESSAGE.DEFAULT },
      };
    }
  },

  delete: async (lineId: number, accessToken: string): Promise<APIReturnTypeLine> => {
    try {
      await request(`${REQUEST_URL}/lines/${lineId}`, {
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

      return {
        ok: false,
        error: { type: ERROR_TYPE.INTERNAL_SERVER_ERROR, message: ERROR_MESSAGE.DEFAULT },
      };
    }
  },
};

export default API;
export type { LineData, APIResponseDataLine, APIReturnTypeLine };
