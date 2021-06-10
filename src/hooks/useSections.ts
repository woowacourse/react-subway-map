import API, { SectionData } from '../apis/section';

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
