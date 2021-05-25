import { useState } from 'react';
import { StationForm } from '../types';

const useStation = () => {
  const [form, setForm] = useState<StationForm>({ name: '' });
  const { name } = form;

  const setName = (name: string) => {
    setForm({ ...form, name });
  };

  const addStation = () => {
    //
  };

  return { name, setName };
};

export default useStation;
