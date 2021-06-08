import axios from 'axios';
import { failureResponse, successResponse } from '.';
import { API } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { LineInfoState, LineState } from '../interfaces/line';

export const lineAPI = {
  getLines: async () => {
    try {
      const response = await axios.get<LineState['lines']>(API.LINES());

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.LOAD_FAILED);
      }

      return successResponse({ data: { lines: response.data } });
    } catch (error) {
      return failureResponse({ message: error.message });
    }
  },

  addLine: async (line: LineInfoState) => {
    try {
      const response = await axios.post<LineState['lines']>(API.LINES(), line);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.ADD_FAILED);
      }

      return successResponse({ data: { line: response.data } });
    } catch (error) {
      return failureResponse({ message: error.message });
    }
  },

  deleteLine: async (id: number) => {
    try {
      const response = await axios.delete(`${API.LINES()}/${id}`);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.DELETE_FAILED);
      }

      return successResponse();
    } catch (error) {
      return failureResponse({ message: error.message });
    }
  },
};
