import axios from 'axios';
import { failureResponse, successResponse } from '.';
import { API } from '../constants/api';
import { MESSAGE } from '../constants/constant';
import { AddSectionAction, DeleteSectionAction, SectionState } from '../interfaces/section';

export const sectionAPI = {
  getSection: async (id: SectionState['lineSection']['id']) => {
    try {
      const response = await axios.get<SectionState['lineSection']>(API.SECTION(id));

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.SECTION.LOAD_FAILED);
      }

      return successResponse({ data: { lineSection: response.data } });
    } catch (error) {
      return failureResponse({ message: error.message });
    }
  },

  addSection: async ({ lineId, ...data }: AddSectionAction['payload']) => {
    try {
      const response = await axios.post(`${API.SECTION(Number(lineId))}`, data);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.SECTION.ADD_FAILED);
      }

      return successResponse();
    } catch (error) {
      return failureResponse({ message: error.message });
    }
  },

  deleteSection: async ({ lineId, stationId }: DeleteSectionAction['payload']) => {
    try {
      const response = await axios.delete(`${API.SECTION(Number(lineId))}?stationId=${stationId}`);

      if (response.status >= 400) {
        throw new Error(MESSAGE.ERROR.SECTION.DELETE_FAILED);
      }

      return successResponse();
    } catch (error) {
      return failureResponse({ message: error.message });
    }
  },
};
