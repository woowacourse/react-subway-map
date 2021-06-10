import { Dispatch, SetStateAction, useState } from 'react';
import API, { APIReturnTypeStation, StationData } from '../apis/station';

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
