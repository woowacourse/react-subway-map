import { REQUEST_URL } from './request';
import APIFetcher from './apiFetcher';
interface SectionData {
  upStationId: number;
  downStationId: number;
  distance: number;
}

const API = {
  post: async (lineId: number, data: SectionData) => {
    return await APIFetcher<never, string>()(
      `${REQUEST_URL}/lines/${lineId}/sections`,
      'POST',
      JSON.stringify(data)
    );
  },
  delete: async (lineId: number, stationId: number) => {
    return await APIFetcher<never, string>()(
      `${REQUEST_URL}/lines/${lineId}/sections?stationId=${stationId}`,
      'DELETE'
    );
  },
};

export default API;
export type { SectionData };
