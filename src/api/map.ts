import axios, { AxiosResponse } from 'axios';
import { API, API_RESULT } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { MapState } from '../interfaces/map';

interface GetMapResponse extends AxiosResponse {
  maps: MapState[];
}

export const mapAPI = {
  map: async () => {
    try {
      const response = await axios.get<GetMapResponse>(API.MAP());

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.MAP.LOAD_FAILED);
      }

      return Object.assign(API_RESULT.SUCCESS, { data: { maps: response.data } });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { data: { maps: [] }, message: error.message });
    }
  },
};
