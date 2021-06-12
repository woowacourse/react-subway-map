import React, { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return { value, setValue, onChange };
};

export default useInput;
