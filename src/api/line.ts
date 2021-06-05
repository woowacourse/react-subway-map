import axios from 'axios';
import { API } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { AddLineAction, DeleteLineAction, LineState } from '../interfaces/line';

interface GetLinesResponse {
  status: number;
  data: LineState['lines'];
}

interface AddLineResponse {
  status: number;
  data: LineState['lines'];
}

interface DeleteLineResponse {
  status: number;
}

export const lineAPI = {
  getLines: async () => {
    try {
      const response: GetLinesResponse = await axios.get(API.LINES());

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.LOAD_FAILED);
      }

      return { success: true, data: { lines: response.data }, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
    }
  },

  addLine: async (line: AddLineAction['payload']['line']) => {
    try {
      const response: AddLineResponse = await axios.post(API.LINES(), line);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.ADD_FAILED);
      }

      return { success: true, data: { line: response.data }, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
    }
  },

  deleteLine: async (id: DeleteLineAction['payload']['id']) => {
    try {
      const response: DeleteLineResponse = await axios.delete(`${API.LINES()}/${id}`);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.DELETE_FAILED);
      }

      return { success: true, data: {}, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
    }
  },
};
