import { ChangeEventHandler, useState } from 'react';

const useInput = (
  defaultValue: string
): [value: string, onChange: ChangeEventHandler<HTMLInputElement>] => {
  const [value, setValue] = useState(defaultValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setValue(target.value);
  };

  return [value, onChange];
};

export default useInput;
