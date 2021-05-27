import { Dispatch, SetStateAction, useState } from 'react';
import { request, REQUEST_URL } from '../request';
import { APIReturnTypeSection } from './useSections';

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
  sections: APIReturnTypeSection[];
}

const useLines = (
  initialLines: APIReturnTypeLine[]
): [
  APIReturnTypeLine[],
  Dispatch<SetStateAction<APIReturnTypeLine[]>>,
  () => Promise<void>,
  (lineId: number) => Promise<void>,
  (data: LineData) => Promise<void>,
  (lineId: number) => Promise<void>
] => {
  const [lines, setLines] = useState<APIReturnTypeLine[]>(initialLines);

  const fetchLine = async (lineId: number): Promise<void> => {
    const response = await request(`${REQUEST_URL}/lines/${lineId}`, {
      method: 'GET',
    });

    const fetchedLine = await response.json();

    setLines((prevLines) =>
      prevLines.map((line) => {
        if (line.id === lineId) {
          return fetchedLine;
        }
        return line;
      })
    );
  };

  const fetchLines = async (): Promise<void> => {
    const response = await request(`${REQUEST_URL}/lines`, {
      method: 'GET',
    });

    const fetchedLines = await response.json();

    setLines(fetchedLines);
  };

  const addLine = async (data: LineData): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');

      return;
    }

    await request(`${REQUEST_URL}/lines`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
  };

  const deleteLine = async (lineId: number): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');

      return;
    }

    await request(`${REQUEST_URL}/lines/${lineId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return [lines, setLines, fetchLines, fetchLine, addLine, deleteLine];
};

export default useLines;
export type { APIReturnTypeLine };
