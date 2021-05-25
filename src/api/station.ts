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
      console.log(response);
      if (!response.data) {
        throw new Error('역 정보를 불러오는데 실패했습니다...!');
      }

      return { stations: response.data };
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },
};
