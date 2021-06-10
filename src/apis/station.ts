import { request, REQUEST_URL } from '../request';

interface StationData {
  name: string;
}

interface APIReturnTypeStation {
  id: number;
  name: string;
  lines?: {
    id: number;
    name: string;
    color: string;
  }[];
}

const API = {
  get: async (): Promise<APIReturnTypeStation[]> => {
    const response = await request(`${REQUEST_URL}/stations`, {
      method: 'GET',
    });

    return await response.json();
  },
  post: async (data: StationData, accessToken: string): Promise<void> => {
    await request(`${REQUEST_URL}/stations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  },
  delete: async (stationId: number, accessToken: string): Promise<void> => {
    await request(`${REQUEST_URL}/stations/${stationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

export default API;
export type { StationData, APIReturnTypeStation };
