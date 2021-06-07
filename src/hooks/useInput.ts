import React, { useState, useRef } from 'react';

const useInput = <T extends unknown>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const ref = useRef<HTMLInputElement>(null);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value as T);
  };

  const onChangeNumber: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(Number(event.target.value) as T);
  };

  return { value, onChange, onChangeNumber, setValue, ref };
};

export default useInput;
