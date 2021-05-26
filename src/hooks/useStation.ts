import { useState } from 'react';
import { useQuery } from 'react-query';
import { requestStations } from '../service/station';
import { StationForm } from '../types';
import useLogin from './useLogin';

const useStation = () => {
  const { accessToken } = useLogin();
  const [form, setForm] = useState<StationForm>({ name: '' });
  const { name } = form;

  const stations = useQuery('requestStations', () =>
    requestStations(accessToken)
  );

  const setName = (name: string) => {
    setForm({ ...form, name });
  };

  const addStation = () => {
    //
  };

  return { stations, name, setName };
};

export default useStation;
