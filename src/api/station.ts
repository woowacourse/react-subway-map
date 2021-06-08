import axios, { AxiosResponse } from 'axios';
import { API, API_RESULT } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { StationLineState, StationState } from '../interfaces/station';

export const stationAPI = {
  getStations: async () => {
    try {
      const response = await axios.get<StationState['stations']>(API.GET_STATIONS());

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.STATION.LOAD_FAILED);
      }

      return Object.assign(API_RESULT.SUCCESS, { data: { stations: response.data } });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },

  addStation: async (name: StationLineState['name']) => {
    try {
      const data = { name };
      const response = await axios.post<StationState['stations']>(API.GET_STATIONS(), data);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.STATION.ADD_FAILED);
      }

      return Object.assign(API_RESULT.SUCCESS, { data: { station: response.data } });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },

  deleteStation: async (id: StationLineState['id']) => {
    try {
      const response = await axios.delete(`${API.GET_STATIONS()}/${id}`);

      if (response.status === 400) {
        throw new Error(MESSAGE.ERROR.STATION.REGISTERED_LINE_STATION);
      }

      if (response.status !== 204) {
        throw new Error(MESSAGE.ERROR.STATION.DELETE_FAILED);
      }

      return API_RESULT.SUCCESS;
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },
};
