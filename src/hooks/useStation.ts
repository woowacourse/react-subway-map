import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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

  const isValidName = name.length > 2;

  const setName = (name: string) => {
    setForm({ ...form, name });
  };

  const addStation = () => {
    addMutation.mutate();
  };

  const deleteStation = (stationId: StationId) => {
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
