import { ChangeEventHandler, Dispatch, SetStateAction, useState } from 'react';

const useInput = (
  defaultValue: string
): [
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  setValue: Dispatch<SetStateAction<string>>
] => {
  const [value, setValue] = useState(defaultValue);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setValue(target.value);
  };

  return [value, onChange, setValue];
};

export default useInput;
