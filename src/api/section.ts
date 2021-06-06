import axios from 'axios';
import { API } from '../constants/api';
import { AddSectionRequest, DeleteSectionRequest, LineSection, HttpResponse } from '../interfaces';

export const sectionAPI = {
  getSection: async (id: LineSection['id']): Promise<HttpResponse<LineSection>> => {
    const response = await axios.get(API.SECTION(id));

    if (response.status >= 400) {
      return { data: response.data, error: '노선 정보를 불러오는데 실패했습니다.' };
    }

    return { data: response.data, error: null };
  },

  addSection: async ({ lineId, ...data }: AddSectionRequest): Promise<HttpResponse> => {
    const response = await axios.post(`${API.SECTION(Number(lineId))}`, data);

    if (response.status >= 400) {
      return { data: response.data, error: '구간 추가에 실패했습니다.' };
    }

    return { data: response.data, error: null };
  },

  deleteSection: async ({ lineId, stationId }: DeleteSectionRequest): Promise<HttpResponse> => {
    const response = await axios.delete(`${API.SECTION(Number(lineId))}?stationId=${stationId}`);

    if (response.status >= 400) {
      return { data: response.data, error: '구간 삭제에 실패했습니다.' };
    }

    return { data: response.data, error: null };
  },
};
