import { StationForm } from './../types';
import { useState } from 'react';
import { REGEX } from '../constants/validate';

const useStationAddForm = () => {
  const [form, setForm] = useState<StationForm>({ name: '' });
  const { name } = form;

  const isValidName = REGEX.STATION_NAME.test(name);

  const setName = (name: string) => {
    setForm({ ...form, name });
  };

  return {
    form,
    name,
    setName,
    isValidName,
  };
};

export default useStationAddForm;
