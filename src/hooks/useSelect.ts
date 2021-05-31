import { useState, useRef } from 'react';

const useSelect = <T extends unknown>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const ref = useRef<HTMLSelectElement>(null);

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setValue(event.target.value as T);
  };

  const onChangeNumber: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setValue(Number(event.target.value) as T);
  };

  return { value, onChange, onChangeNumber, setValue, ref };
};

export default useSelect;
