import { request, REQUEST_URL } from '../request';
import { APIReturnTypeStation } from './station';

interface SectionData {
  upStationId: number;
  downStationId: number;
  distance: number;
}

interface APIReturnTypeSection {
  id: number;
  upStation: APIReturnTypeStation;
  downStation: APIReturnTypeStation;
  distance: number;
}

const API = {
  post: async (lineId: number, data: SectionData, accessToken: string) => {
    await request(`${REQUEST_URL}/lines/${lineId}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  },
  delete: async (lineId: number, stationId: number, accessToken: string) => {
    await request(`${REQUEST_URL}/lines/${lineId}/sections?stationId=${stationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default API;
export type { SectionData, APIReturnTypeSection };
