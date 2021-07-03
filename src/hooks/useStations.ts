import { FormEventHandler, useContext, useState } from 'react';

import { SnackBarContext } from '../contexts/SnackBarProvider';
import { UserContext } from '../contexts/UserContextProvider';

import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../constants/messages';
import REGEX from '../constants/regex';
import { STATION_VALUE } from '../constants/values';

import api from '../apis';
import { RequestTypeStation } from '../apis/types';
import useInput from './useInput';
import { Station } from '../types';

const useStations = (initialStations: Station[] = []) => {
  const [stations, setStations] = useState<Station[]>(initialStations);
  const [stationInput, onStationInputChange, setStationInput] = useInput('');
  const [stationInputErrorMessage, setStationInputErrorMessage] = useState<string>('');

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

  const onStationInputSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const isStationInputValid =
      stationInput.length >= STATION_VALUE.NAME_MIN_LENGTH &&
      stationInput.length <= STATION_VALUE.NAME_MAX_LENGTH &&
      REGEX.KOREAN_DIGIT.test(stationInput);
    const isStationInputDuplicated = stations.some((item) => item.name === stationInput);

    if (!isStationInputValid) {
      setStationInputErrorMessage(ERROR_MESSAGE.INVALID_STATION_INPUT);
      return;
    }

    if (isStationInputDuplicated) {
      setStationInputErrorMessage(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
      return;
    }

    const [isDuplicated, message] = (await addStation({ name: stationInput })) ?? [];

    if (isDuplicated) {
      setStationInputErrorMessage(message ?? '');
    }

    setStationInputErrorMessage('');
    setStationInput('');
  };

  const onStationDelete = async (id: number, name: string) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE_STATION(name))) return;

    await deleteStation(id);
  };

  return {
    stations,
    fetchStations,
    stationInput,
    onStationInputChange,
    stationInputErrorMessage,
    handler: {
      onStationInputSubmit,
      onStationDelete,
    },
  };
};

export default useStations;
