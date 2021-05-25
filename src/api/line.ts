import axios from 'axios';
import { API, RESPONSE } from '../constants/api';
import { Line } from '../interfaces';

interface GetLinesReponse {
  data: Line[];
}

export const lineAPI = {
  getLines: async () => {
    try {
      const response: GetLinesReponse = await axios.get(API.LINES);

      if (!response.data) {
        throw new Error('노선 정보를 불러오는데 실패했습니다...!');
      }

      return { lines: response.data };
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },
};
