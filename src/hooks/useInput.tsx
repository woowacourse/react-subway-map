import React, { useState, useRef } from 'react';

const useInput = (initialValue = '') => {
  const [value, setValue] = useState<string>(initialValue);
  const ref = useRef<HTMLInputElement & HTMLSelectElement>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setValue(event.target.value);
  };

  return { value, onChange, setValue, ref };
};

export default useInput;
