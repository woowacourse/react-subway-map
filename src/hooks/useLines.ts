import { Dispatch, SetStateAction, useState } from 'react';
import API, { LineData, APIResponseDataLine } from '../apis/line';
import ERROR_TYPE from '../constants/errorType';
import { ERROR_MESSAGE } from '../constants/messages';

interface Error {
  type: string;
  message: string;
}

const defaultError = {
  type: ERROR_TYPE.DEFAULT,
  message: ERROR_MESSAGE.DEFAULT,
};

const useLines = (
  initialLines: APIResponseDataLine[]
): [
  APIResponseDataLine[],
  Dispatch<SetStateAction<APIResponseDataLine[]>>,
  () => Promise<boolean>,
  (lineId: number) => Promise<boolean>,
  (data: LineData) => Promise<boolean>,
  (lineId: number) => Promise<boolean>,
  Error
] => {
  const [lines, setLines] = useState<APIResponseDataLine[]>(initialLines);
  const [error, setError] = useState(defaultError);

  const fetchLines = async () => {
    const response = await API.get();

    if (response.ok) {
      setLines((response.data as APIResponseDataLine[]) || []);
      return true;
    }

    setError({
      ...response.error,
      message: ERROR_MESSAGE[response.error.type] || ERROR_MESSAGE.DEFAULT,
    });
    return false;
  };

  const fetchLine = async (lineId: number) => {
    const response = await API.getLine(lineId);

    if (response.ok) {
      setLines((prevLines) =>
        prevLines.map((line) => {
          if (line.id === lineId) {
            return response.data as APIResponseDataLine;
          }
          return line;
        })
      );
      return true;
    }

    setError({
      ...response.error,
      message: ERROR_MESSAGE[response.error.type] || ERROR_MESSAGE.DEFAULT,
    });
    return false;
  };

  const addLine = async (data: LineData) => {
    const response = await API.post(data);

    if (response.ok) {
      return true;
    }

    setError({
      ...response.error,
      message: ERROR_MESSAGE[response.error.type] || ERROR_MESSAGE.DEFAULT,
    });
    return false;
  };

  const deleteLine = async (lineId: number) => {
    const response = await API.delete(lineId);

    if (response.ok) {
      return true;
    }

    setError({
      ...response.error,
      message: ERROR_MESSAGE['LINE_DELETE_' + response.error.type] || ERROR_MESSAGE.DEFAULT,
    });
    return false;
  };

  return [lines, setLines, fetchLines, fetchLine, addLine, deleteLine, error];
};

export default useLines;
