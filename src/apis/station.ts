import { REQUEST_URL } from './request';
import APIFetcher from './apiFetcher';

interface StationData {
  name: string;
}

interface APIResponseDataStation {
  id: number;
  name: string;
  lines?: {
    id: number;
    name: string;
    color: string;
  }[];
}

const API = {
  get: async () => {
    return await APIFetcher<APIResponseDataStation[], string>()(`${REQUEST_URL}/stations`, 'GET');
  },
  post: async (data: StationData) => {
    return await APIFetcher<never, string>()(
      `${REQUEST_URL}/stations`,
      'POST',
      JSON.stringify(data)
    );
  },
  delete: async (stationId: number) => {
    return await APIFetcher<never, string>()(`${REQUEST_URL}/stations/${stationId}`, 'DELETE');
  },
};

export default API;
export type { StationData, APIResponseDataStation };
