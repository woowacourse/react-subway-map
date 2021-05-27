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

    await request(`${REQUEST_URL}/lines/${lineId}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  };

  const deleteSection = async (lineId: number, stationId: number): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');
      return;
    }

    await request(`${REQUEST_URL}/lines/${lineId}/sections?stationId=${stationId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return [addSection, deleteSection];
};

export default useSections;
export type { APIReturnTypeSection };
