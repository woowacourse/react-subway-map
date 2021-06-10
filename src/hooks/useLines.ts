import { Dispatch, SetStateAction, useState } from 'react';
import API, { LineData, APIReturnTypeLine } from '../apis/line';

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
    const fetchedLine: APIReturnTypeLine = await API.getLine(lineId);

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
