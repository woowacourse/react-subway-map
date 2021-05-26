import axios from 'axios';
import { API, RESPONSE } from '../constants/api';
import { AddLine, Line } from '../interfaces';

interface GetLinesReponse {
  status: number;
  data: Line[];
}

export const lineAPI = {
  getLines: async () => {
    try {
      const response: GetLinesReponse = await axios.get(API.LINES);

      if (response.status >= 400) {
        throw new Error('노선 정보를 불러오는데 실패했습니다...!');
      }

      return { lines: response.data };
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },

  addLine: async (line: AddLine) => {
    try {
      const response: { status: number; data: Line } = await axios.post(API.LINES, line);
      if (response.status >= 400) {
        throw new Error('노선을 추가하는데 실패했습니다...!');
      }

      return { line: response.data };
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },
};
