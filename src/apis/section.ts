import { request, REQUEST_URL } from '../request';
import { APIReturnTypeStation } from './station';
import ERROR_TYPE from '../constants/errorType';
import { ERROR_MESSAGE } from '../constants/messages';
import STATUS_CODE from '../constants/statusCode';

interface SectionData {
  upStationId: number;
  downStationId: number;
  distance: number;
}

interface APIResponseDataSection {
  id: number;
  upStation: APIReturnTypeStation;
  downStation: APIReturnTypeStation;
  distance: number;
}

interface APIReturnTypeSection {
  ok: boolean;
  error?: { type: string; message: string };
}

const API = {
  post: async (
    lineId: number,
    data: SectionData,
    accessToken: string
  ): Promise<APIReturnTypeSection> => {
    try {
      await request(`${REQUEST_URL}/lines/${lineId}/sections`, {
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
  delete: async (
    lineId: number,
    stationId: number,
    accessToken: string
  ): Promise<APIReturnTypeSection> => {
    try {
      await request(`${REQUEST_URL}/lines/${lineId}/sections?stationId=${stationId}`, {
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
          error: {
            type: ERROR_TYPE.SECTION_LENGTH_OUT_OF_RANGE,
            message: ERROR_MESSAGE.SECTION_LENGTH_OUT_OF_RANGE,
          },
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
export type { SectionData, APIReturnTypeSection };
