import { useState } from "react";

const useSelect = (initialValue?: string) => {
  const [selectValue, setSelectValue] = useState(initialValue);

  const setValueOnChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    const { value } = target;

    setSelectValue(value);
  };

  return { selectValue, setSelectValue, setValueOnChange };
};

export default useSelect;
