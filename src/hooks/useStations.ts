import { Dispatch, SetStateAction, useState } from 'react';
import { request, REQUEST_URL } from '../request';

interface StationData {
  name: string;
}

interface APIReturnTypeStation {
  id: number;
  name: string;
}

const useStations = (
  initialStations: APIReturnTypeStation[]
): [
  APIReturnTypeStation[],
  Dispatch<SetStateAction<APIReturnTypeStation[]>>,
  () => Promise<void>,
  (data: StationData) => Promise<APIReturnTypeStation | undefined>,
  (stationId: number) => Promise<void>
] => {
  const [stations, setStations] = useState<APIReturnTypeStation[]>(initialStations);

  const fetchStations = async (): Promise<void> => {
    const response = await request(`${REQUEST_URL}/stations`, {
      method: 'GET',
    });

    const fetchedStations = await response.json();

    setStations(fetchedStations);
  };

  const addStation = async (data: StationData): Promise<APIReturnTypeStation | undefined> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');
      return;
    }

    await request(`${REQUEST_URL}/stations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  };

  const deleteStation = async (stationId: number): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');
      return;
    }

    await request(`${REQUEST_URL}/stations/${stationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return [stations, setStations, fetchStations, addStation, deleteStation];
};

export default useStations;
export type { APIReturnTypeStation };
