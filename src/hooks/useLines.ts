import { Dispatch, SetStateAction, useState } from 'react';
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

  getOne: async (lineId: number): Promise<APIReturnTypeLine> => {
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
    const fetchedLine: APIReturnTypeLine = await API.getOne(lineId);

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
    const response = await API.get();

    setLines(response);
  };

  const addLine = async (data: LineData): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');

      return;
    }

    await API.post(data, accessToken);
  };

  const deleteLine = async (lineId: number): Promise<void> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('no accessToken');

      return;
    }

    await API.delete(lineId, accessToken);
  };

  return [lines, setLines, fetchLines, fetchLine, addLine, deleteLine];
};

export default useLines;
export { API };
export type { APIReturnTypeLine };
