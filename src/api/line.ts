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

      return { lines: response.data };
    } catch (error) {
      return { error: error.message ?? MESSAGE.ERROR.RESPONSE };
    }
  },

  addLine: async (line: AddLineAction['payload']['line']) => {
    try {
      const response: AddLineResponse = await axios.post(API.LINES(), line);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.ADD_FAILED);
      }

      return { line: response.data };
    } catch (error) {
      return { error: error.message ?? MESSAGE.ERROR.RESPONSE };
    }
  },

  deleteLine: async (id: DeleteLineAction['payload']['id']) => {
    try {
      const response: DeleteLineResponse = await axios.delete(`${API.LINES()}/${id}`);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.DELETE_FAILED);
      }

      return {};
    } catch (error) {
      return { error: error.message ?? MESSAGE.ERROR.RESPONSE };
    }
  },
};
