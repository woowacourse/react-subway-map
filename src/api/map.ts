import axios, { AxiosResponse } from 'axios';
import { API, API_RESULT } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { MapState } from '../interfaces/map';

export const mapAPI = {
  map: async () => {
    try {
      const response = await axios.get<MapState[]>(API.MAP());

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.MAP.LOAD_FAILED);
      }

      return Object.assign(API_RESULT.SUCCESS, { data: response.data });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { data: [] as MapState[], message: error.message });
    }
  },
};
