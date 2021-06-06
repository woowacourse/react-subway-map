import { StationForm } from './../types';
import { useState } from 'react';
import { REGEX } from '../constants/validate';

const useStationAddForm = () => {
  const [form, setForm] = useState<StationForm>({ name: '' });

  const isValidName = REGEX.STATION_NAME.test(form.name);

  const setName = (name: string) => {
    setForm({ ...form, name });
  };

  return {
    form,

    setName,

    isValidName,
  };
};

export default useStationAddForm;
