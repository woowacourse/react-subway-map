import { request, REQUEST_URL } from '../request';
import { APIReturnTypeStation } from './useStations';

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

const useSections = (): [
  (lineId: number, data: SectionData) => Promise<void>,
  (lineId: number, stationId: number) => Promise<void>
] => {
  const addSection = async (lineId: number, data: SectionData): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');
      return;
    }

    await API.post(lineId, data, accessToken);
  };

  const deleteSection = async (lineId: number, stationId: number): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');
      return;
    }

    await API.delete(lineId, stationId, accessToken);
  };

  return [addSection, deleteSection];
};

export default useSections;
export { API };
export type { APIReturnTypeSection };
