import { useState, useRef } from 'react';

const useSelect = <T extends unknown>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const ref = useRef<HTMLSelectElement>(null);

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setValue(event.target.value as T);
  };

  return { value, valueAsNumber: Number(value), onChange, setValue, ref };
};

export default useSelect;
