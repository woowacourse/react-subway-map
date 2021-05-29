import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { REGEX } from '../constants/validate';
import { requestLines } from '../service/line';
import {
  requestAddStation,
  requestDeleteStation,
  requestStations,
} from '../service/station';
import { StationForm, StationId } from '../types';
import useLogin from './useLogin';

const useStation = () => {
  const [form, setForm] = useState<StationForm>({ name: '' });
  const { name } = form;
  const { accessToken } = useLogin();
  const queryClient = useQueryClient();
  const lines = useQuery('requestLines', () => requestLines(accessToken));

  const addMutation = useMutation(() => requestAddStation(form, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries('requestStations');
    },
  });

  const deleteMutation = useMutation(
    (stationId: StationId) => requestDeleteStation(stationId, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('requestStations');
      },
    }
  );

  const stations = useQuery('requestStations', () =>
    requestStations(accessToken)
  );

  const isValidName = REGEX.STATION_NAME.test(name);

  const setName = (name: string) => {
    setForm({ ...form, name });
  };

  const addStation = () => {
    addMutation.mutate();
  };

  const deleteStation = (stationId: StationId) => {
    if (false) return;

    deleteMutation.mutate(stationId);
  };

  const isAddStationError = addMutation.error;

  return {
    stations,
    name,
    setName,
    addStation,
    isAddStationError,
    deleteStation,
    isValidName,
  };
};

export default useStation;
