import axios from 'axios';
import { API } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { AddSectionAction, DeleteSectionAction, SectionState } from '../interfaces/section';

interface GetSectionResponse {
  status: number;
  data: SectionState['lineSection'];
}

export const sectionAPI = {
  getSection: async (id: SectionState['lineSection']['id']) => {
    try {
      const response: GetSectionResponse = await axios.get(API.SECTION(id));

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.SECTION.LOAD_FAILED);
      }

      return { success: true, data: { lineSection: response.data }, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
    }
  },

  addSection: async ({ lineId, ...data }: AddSectionAction['payload']) => {
    try {
      const response = await axios.post(`${API.SECTION(Number(lineId))}`, data);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.SECTION.ADD_FAILED);
      }

      return { success: true, data: {}, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
    }
  },

  deleteSection: async ({ lineId, stationId }: DeleteSectionAction['payload']) => {
    try {
      const response = await axios.delete(`${API.SECTION(Number(lineId))}?stationId=${stationId}`);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.SECTION.DELETE_FAILED);
      }

      return { success: true, data: {}, message: '' };
    } catch (error) {
      return { success: false, data: {}, message: error.message };
    }
  },
};
