import { REQUEST_URL } from './request';
import APIFetcher from './apiFetcher';

interface LineData {
  name: string;
  color: string;
  upStationId: number;
  downStationId: number;
  distance: number;
}
interface APIResponseDataLine {
  id: number;
  name: string;
  color: string;
  stations: {
    id: number;
    name: string;
    distance?: number;
  }[];
}

const API = {
  get: async () => {
    return await APIFetcher<APIResponseDataLine[], string>()(`${REQUEST_URL}/lines`, 'GET');
  },

  getLine: async (lineId: number) => {
    return await APIFetcher<APIResponseDataLine, string>()(`${REQUEST_URL}/lines/${lineId}`, 'GET');
  },

  post: async (data: LineData) => {
    return await APIFetcher<never, string>()(`${REQUEST_URL}/lines`, 'POST', JSON.stringify(data));
  },

  delete: async (lineId: number) => {
    return await APIFetcher<never, string>()(`${REQUEST_URL}/lines/${lineId}`, 'DELETE');
  },
};

export default API;
export type { LineData, APIResponseDataLine };
