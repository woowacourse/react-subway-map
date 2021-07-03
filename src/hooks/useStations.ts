import { Dispatch, SetStateAction, useContext, useState } from 'react';

import api from '../apis';
import { RequestTypeStation } from '../apis/types';
import { SnackBarContext } from '../contexts/SnackBarProvider';
import { UserContext } from '../contexts/UserContextProvider';
import { Station } from '../types';

const useStations = (
  initialStations: Station[] = []
): {
  stations: Station[];
  setStations: Dispatch<SetStateAction<Station[]>>;
  fetchStations: () => Promise<void>;
  addStation: (data: RequestTypeStation) => Promise<[boolean, string] | undefined>;
  deleteStation: (stationId: number) => Promise<void>;
} => {
  const [stations, setStations] = useState<Station[]>(initialStations);
  const addMessage = useContext(SnackBarContext)?.addMessage;
  const setIsLoggedIn = useContext(UserContext)?.setIsLoggedIn;

  const fetchStations = async (): Promise<void> => {
    const { isSucceeded, message, result } = await api.station.get();

    setStations(result ?? []);

    if (!isSucceeded) {
      addMessage?.(message);
    }
  };

  const addStation = async (data: RequestTypeStation): Promise<[boolean, string] | undefined> => {
    const { message, result } = await api.station.post(data);

    if (result && !result.auth) {
      setIsLoggedIn?.(false);

      return;
    }

    if (result && !result.duplicated) {
      addMessage?.(message);
    }

    await fetchStations();

    return [result?.duplicated ?? false, message];
  };

  const deleteStation = async (stationId: number): Promise<void> => {
    const { message, result } = await api.station.delete(stationId);

    addMessage?.(message);

    if (result && !result.auth) {
      setIsLoggedIn?.(false);

      return;
    }

    await fetchStations();
  };

  return { stations, setStations, fetchStations, addStation, deleteStation };
};

export default useStations;
