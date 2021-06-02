import React, { useState } from 'react';

const useChangeEvent = (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { value } = event.target;

    setValue(value);
  };

  return { value, setValue, onChange };
};

export default useChangeEvent;
