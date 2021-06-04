import React, { useState } from 'react';

const useChangeEvent = <T>(defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = event.target.value as unknown as T;

    setValue(newValue);
  };

  return { value, setValue, onChange };
};

export default useChangeEvent;
