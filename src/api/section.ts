import axios from 'axios';
import { API, RESPONSE } from '../constants/api';
import { AddSectionRequest, DeleteSectionRequest, LineSection } from '../interfaces';

interface GetSectionResponse {
  status: number;
  data: LineSection;
}

export const sectionAPI = {
  getSection: async (id: LineSection['id']) => {
    try {
      const response: GetSectionResponse = await axios.get(API.SECTION(id));

      if (response.status >= 400) {
        throw new Error('노선 정보를 불러오는데 실패했습니다...!');
      }

      return { lineSection: response.data };
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },

  addSection: async ({ lineId, ...data }: AddSectionRequest) => {
    try {
      const response = await axios.post(`${API.SECTION(Number(lineId))}`, data);

      if (response.status >= 400) {
        throw new Error('구간 추가에 실패했습니다...!');
      }

      return {};
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },

  deleteSection: async ({ lineId, stationId }: DeleteSectionRequest) => {
    try {
      const response = await axios.delete(`${API.SECTION(Number(lineId))}?stationId=${stationId}`);

      if (response.status >= 400) {
        throw new Error('구간 삭제에 실패했습니다...!');
      }

      return {};
    } catch (error) {
      return { error: error.message ?? RESPONSE.FAILURE };
    }
  },
};
