import React, { useState, useRef } from 'react';

const useInput = <T extends unknown>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const ref = useRef<HTMLInputElement>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value as T);
  };

  return { value, valueAsNumber: Number(value), onChange, setValue, ref };
};

export default useInput;
