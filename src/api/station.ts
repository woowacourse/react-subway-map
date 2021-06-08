import axios from 'axios';
import { failureResponse, successResponse } from '.';
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

      return successResponse({ data: { stations: response.data } });
    } catch (error) {
      return failureResponse({ message: error.message });
    }
  },

  addStation: async (name: StationLineState['name']) => {
    try {
      const data = { name };
      const response = await axios.post<StationState['stations']>(API.GET_STATIONS(), data);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.STATION.ADD_FAILED);
      }

      return successResponse({ data: { station: response.data } });
    } catch (error) {
      return failureResponse({ message: error.message });
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

      return successResponse();
    } catch (error) {
      return failureResponse({ message: error.message });
    }
  },
};
