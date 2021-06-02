import { useState } from 'react';

const useChangeEvent = (defaultValue: string) => {
  const [value, setValue] = useState<string>(defaultValue);

  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
    const { value } = event.target;

    setValue(value);
  };

  return { value, setValue, onChange };
};

export default useChangeEvent;
