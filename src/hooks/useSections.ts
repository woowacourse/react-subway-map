import { useState } from 'react';
import API, { SectionData } from '../apis/section';
import ERROR_TYPE from '../constants/errorType';
import { ERROR_MESSAGE } from '../constants/messages';

interface Error {
  type: string;
  message: string;
}

const defaultError = { type: ERROR_TYPE.DEFAULT, message: ERROR_MESSAGE.DEFAULT };

const useSections = (): [
  (lineId: number, data: SectionData) => Promise<boolean>,
  (lineId: number, stationId: number) => Promise<boolean>,
  Error
] => {
  const [error, setError] = useState(defaultError);

  const addSection = async (lineId: number, data: SectionData): Promise<boolean> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');
      setError({ type: ERROR_TYPE.NO_ACCESS_TOKEN, message: ERROR_MESSAGE.UNAUTHORIZED });
      return false;
    }

    const response = await API.post(lineId, data, accessToken);

    if (response.ok) {
      return true;
    }

    setError(response.error || defaultError);
    return false;
  };

  const deleteSection = async (lineId: number, stationId: number): Promise<boolean> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');
      setError({ type: ERROR_TYPE.NO_ACCESS_TOKEN, message: ERROR_MESSAGE.UNAUTHORIZED });
      return false;
    }

    const response = await API.delete(lineId, stationId, accessToken);

    if (response.ok) {
      return true;
    }

    setError(response.error || defaultError);
    return false;
  };

  return [addSection, deleteSection, error];
};

export default useSections;
