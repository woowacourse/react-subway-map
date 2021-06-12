import React, { useState } from 'react';

const useSelect = () => {
  const [value, setValue] = useState(0);

  const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(Number(target.value));
  };

  return { value, onChange };
};

export default useSelect;
