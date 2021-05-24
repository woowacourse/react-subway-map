import { useState } from 'react';

const useInput = (defaultValue: string, validator: (value: string) => boolean) => {
  const [value, setValue] = useState(defaultValue);
  const [isValid, setIsValid] = useState(false);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target;

    setValue(value);

    if (validator(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return { value, onChange, isValid };
};

export default useInput;
