import axios, { AxiosResponse } from 'axios';
import { API, API_RESULT } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { LineInfoState, LineState } from '../interfaces/line';

export const lineAPI = {
  getLines: async () => {
    try {
      const response = await axios.get<LineState['lines']>(API.LINES());

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.LOAD_FAILED);
      }

      return Object.assign(API_RESULT.SUCCESS, { data: { lines: response.data } });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },

  addLine: async (line: LineInfoState) => {
    try {
      const response = await axios.post<LineState['lines']>(API.LINES(), line);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.ADD_FAILED);
      }

      return Object.assign(API_RESULT.SUCCESS, { data: { line: response.data } });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },

  deleteLine: async (id: number) => {
    try {
      const response = await axios.delete(`${API.LINES()}/${id}`);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.DELETE_FAILED);
      }

      return API_RESULT.SUCCESS;
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },
};
