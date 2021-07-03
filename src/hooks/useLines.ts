import { Dispatch, SetStateAction, useContext, useState } from 'react';
import api from '../apis';
import { RequestTypeLine } from '../apis/types';
import { SnackBarContext } from '../contexts/SnackBarProvider';
import { UserContext } from '../contexts/UserContextProvider';
import { Line } from '../types';

const useLines = (
  initialLines: Line[]
): {
  lines: Line[];
  setLines: Dispatch<SetStateAction<Line[]>>;
  fetchLine: (lineId: number) => Promise<void>;
  fetchLines: () => Promise<void>;
  addLine: (data: RequestTypeLine) => Promise<void>;
  deleteLine: (lineId: number) => Promise<void>;
} => {
  const [lines, setLines] = useState<Line[]>(initialLines);
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;

  const fetchLine = async (lineId: number): Promise<void> => {
    const { isSucceeded, message, result } = await api.line.getOne(lineId);

    if (isSucceeded) {
      setLines((prevLines) =>
        prevLines.map((line) => {
          if (line.id === lineId && result) {
            return result;
          }
          return line;
        })
      );
    } else {
      addMessage?.(message);
    }
  };

  const fetchLines = async (): Promise<void> => {
    const { isSucceeded, message, result } = await api.line.get();

    setLines(result ?? []);

    if (!isSucceeded) {
      addMessage?.(message);
    }
  };

  const addLine = async (data: RequestTypeLine): Promise<void> => {
    const { message, result } = await api.station.post(data);

    if (result && !result.auth) {
      setIsLoggedIn?.(false);

      return;
    }

    addMessage?.(message);
    await fetchLines();
  };

  const deleteLine = async (lineId: number): Promise<void> => {
    const { message, result } = await api.station.delete(lineId);

    if (result && !result.auth) {
      setIsLoggedIn?.(false);

      return;
    }

    addMessage?.(message);
    await fetchLines();
  };

  return { lines, setLines, fetchLine, fetchLines, addLine, deleteLine };
};

export default useLines;
