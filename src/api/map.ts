import axios from 'axios';
import { failureResponse, successResponse } from '.';
import { API } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { MapState } from '../interfaces/map';

export const mapAPI = {
  map: async () => {
    try {
      const response = await axios.get<MapState[]>(API.MAP());

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.MAP.LOAD_FAILED);
      }

      return successResponse({ data: response.data });
    } catch (error) {
      return failureResponse({ data: [] as MapState[], message: error.message });
    }
  },
};
