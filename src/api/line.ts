import axios from 'axios';
import { API } from '../constants/api';
import { AddLineRequest, HttpResponse, Line } from '../interfaces';

export const lineAPI = {
  getLines: async (): Promise<HttpResponse<Line[]>> => {
    const response = await axios.get(API.LINES());

    if (response.status >= 400) {
      return { data: response.data, error: '노선 정보를 불러오는데 실패했습니다.' };
    }

    return { data: response.data, error: null };
  },

  addLine: async (line: AddLineRequest): Promise<HttpResponse<Line>> => {
    const response = await axios.post(API.LINES(), line);
    if (response.status >= 400) {
      return { data: response.data, error: '노선을 추가하는데 실패했습니다.' };
    }

    return { data: response.data, error: null };
  },

  deleteLine: async (id: Line['id']): Promise<HttpResponse> => {
    const response = await axios.delete(`${API.LINES()}/${id}`);

    if (response.status >= 400) {
      return { data: response.data, error: '노선을 삭제하는데 실패했습니다.' };
    }

    return { data: response.data, error: null };
  },
};
