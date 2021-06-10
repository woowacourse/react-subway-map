import { ChangeEventHandler, useState } from 'react';

const useInput = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setValue(target.value);
  };

  return [value, onChange, setValue] as const;
};

export default useInput;
