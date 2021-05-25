import axios from 'axios';
import { API, RESPONSE } from '../constants/api';
import { Station } from '../interfaces';

interface GetStationsReponse {
  data: Station[];
}

export const stationAPI = {
  getStations: async () => {
    try {
      const response: GetStationsReponse = await axios.get(API.GET_STATIONS);

      if (!response.data) {
        throw new Error('역 정보를 불러오는데 실패했습니다...!');
      }

      return { stations: response.data };
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },

  addStation: async (name: Station['name']) => {
    try {
      const data = { name };
      const response: GetStationsReponse = await axios.post(API.GET_STATIONS, data);

      if (!response.data) {
        throw new Error('역 생성에 실패했습니다...!');
      }

      return { station: response.data };
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },
};
