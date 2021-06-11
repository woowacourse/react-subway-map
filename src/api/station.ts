import axios from 'axios';
import { API } from '../constants/api';
import { Station, HttpResponse } from '../interfaces';

export const stationAPI = {
  getStations: async (): Promise<HttpResponse<Station[]>> => {
    const response = await axios.get(API.GET_STATIONS());

    if (response.status >= 400) {
      return { data: response.data, error: '역 정보를 불러오는데 실패했습니다.' };
    }

    return { data: response.data, error: null };
  },

  addStation: async (name: Station['name']): Promise<HttpResponse<Station>> => {
    const response = await axios.post(API.GET_STATIONS(), { name });

    if (response.status >= 400) {
      return { data: response.data, error: '역 생성에 실패했습니다.' };
    }

    return { data: response.data, error: null };
  },

  deleteStation: async (id: Station['id']): Promise<HttpResponse> => {
    const response = await axios.delete(`${API.GET_STATIONS()}/${id}`);

    if (response.status === 400) {
      return { data: response.data, error: '노선에 등록된 역은 삭제가 불가능합니다.' };
    }

    if (response.status !== 204) {
      return { data: response.data, error: '노선에 등록된 역은 삭제가 불가능합니다.' };
    }

    if (response.status > 400) {
      return { data: response.data, error: '역 삭제에 실패하였습니다.' };
    }

    return { data: response.data, error: null };
  },

  editStation: async (id: Station['id'], stationName: Station['name']): Promise<HttpResponse> => {
    const response = await axios.put(`${API.GET_STATIONS()}/${id}`, { name: stationName });

    if (response.status >= 400) {
      return { data: response.data, error: '역 이름 변경에 실패하였습니다.' };
    }

    return { data: response.data, error: null };
  },
};
