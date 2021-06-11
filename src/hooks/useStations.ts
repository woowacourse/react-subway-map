import { Dispatch, SetStateAction, useState } from 'react';
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

const useStations = (
  initialStations: APIReturnTypeStation[] | null
): [
  APIReturnTypeStation[] | null,
  Dispatch<SetStateAction<APIReturnTypeStation[] | null>>,
  () => Promise<void>,
  (data: StationData) => Promise<APIReturnTypeStation | undefined>,
  (stationId: number) => Promise<void>
] => {
  const [stations, setStations] = useState<APIReturnTypeStation[] | null>(initialStations);

  const fetchStations = async (): Promise<void> => {
    const response = await API.get();

    setStations(response);
  };

  const addStation = async (data: StationData): Promise<APIReturnTypeStation | undefined> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');
      return;
    }

    await API.post(data, accessToken);
  };

  const deleteStation = async (stationId: number): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');
      return;
    }

    await API.delete(stationId, accessToken);
  };

  return [stations, setStations, fetchStations, addStation, deleteStation];
};

export default useStations;
export { API };
export type { StationData, APIReturnTypeStation };
