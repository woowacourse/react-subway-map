import axios from 'axios';
import { API } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { StationLineState, StationState } from '../interfaces/station';

interface GetStationsResponse {
  status: number;
  data: StationState['stations'];
}

interface AddStationResponse {
  status: number;
  data: StationState['stations'];
}

export const stationAPI = {
  getStations: async () => {
    try {
      const response: GetStationsResponse = await axios.get(API.GET_STATIONS());

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.STATION.LOAD_FAILED);
      }

      return { success: true, data: { stations: response.data }, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
    }
  },

  addStation: async (name: StationLineState['name']) => {
    try {
      const data = { name };
      const response: AddStationResponse = await axios.post(API.GET_STATIONS(), data);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.STATION.ADD_FAILED);
      }

      return { success: true, data: { station: response.data }, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
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

      return { success: true, data: {}, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
    }
  },
};
