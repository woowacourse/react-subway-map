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

      return { stations: response.data };
    } catch (error) {
      return { error: error.message ?? MESSAGE.ERROR.RESPONSE };
    }
  },

  addStation: async (name: StationLineState['name']) => {
    try {
      const data = { name };
      const response: AddStationResponse = await axios.post(API.GET_STATIONS(), data);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.STATION.ADD_FAILED);
      }

      return { station: response.data };
    } catch (error) {
      return { error: error.message ?? MESSAGE.ERROR.RESPONSE };
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

      return {};
    } catch (error) {
      return { error: error.message ?? MESSAGE.ERROR.RESPONSE };
    }
  },
};
