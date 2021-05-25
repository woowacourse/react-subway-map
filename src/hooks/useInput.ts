import { useState } from 'react';

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;

    setValue(value);
  };

  return { value, setValue, onChange };
};

export default useInput;
