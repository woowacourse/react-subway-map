import axios, { AxiosResponse } from 'axios';
import { API, API_RESULT } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { AddLineAction, DeleteLineAction, LineState } from '../interfaces/line';

interface GetLinesResponse extends AxiosResponse {
  lines: LineState['lines'];
}

interface AddLineResponse extends AxiosResponse {
  line: LineState['lines'];
}

export const lineAPI = {
  getLines: async () => {
    try {
      const response = await axios.get<GetLinesResponse>(API.LINES());

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.LOAD_FAILED);
      }

      return Object.assign(API_RESULT.SUCCESS, { data: { lines: response.data.lines } });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },

  addLine: async (line: AddLineAction['payload']['line']) => {
    try {
      const response = await axios.post<AddLineResponse>(API.LINES(), line);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.ADD_FAILED);
      }

      return Object.assign(API_RESULT.SUCCESS, { data: { line: response.data.line } });
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },

  deleteLine: async (id: DeleteLineAction['payload']['id']) => {
    try {
      const response = await axios.delete<AxiosResponse>(`${API.LINES()}/${id}`);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.LINE.DELETE_FAILED);
      }

      return API_RESULT.SUCCESS;
    } catch (error) {
      return Object.assign(API_RESULT.FAILURE, { message: error.message });
    }
  },
};
