import { request, REQUEST_URL } from '../request';

interface LineData {
  name: string;
  color: string;
  upStationId: number;
  downStationId: number;
  distance: number;
}
interface APIReturnTypeLine {
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
  get: async (): Promise<APIReturnTypeLine[]> => {
    const response = await request(`${REQUEST_URL}/lines`, {
      method: 'GET',
    });

    return await response.json();
  },

  getLine: async (lineId: number): Promise<APIReturnTypeLine> => {
    const response = await request(`${REQUEST_URL}/lines/${lineId}`, {
      method: 'GET',
    });

    return await response.json();
  },

  post: async (data: LineData, accessToken: string): Promise<void> => {
    await request(`${REQUEST_URL}/lines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  },

  delete: async (lineId: number, accessToken: string): Promise<void> => {
    await request(`${REQUEST_URL}/lines/${lineId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default API;
export type { LineData, APIReturnTypeLine };
