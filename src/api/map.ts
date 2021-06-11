import axios from 'axios';
import { API } from '../constants/api';
import { HttpResponse, MapData } from '../interfaces';

export const mapAPI = {
  getMap: async (): Promise<HttpResponse<MapData>> => {
    const response = await axios.get(API.MAP());

    if (response.status >= 400) {
      return { data: response.data, error: '전체보기 정보를 불러오는데 실패했습니다.' };
    }

    return { data: response.data, error: null };
  },
};
