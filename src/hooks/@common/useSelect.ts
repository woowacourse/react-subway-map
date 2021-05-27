import { useState } from "react";

const useSelect = () => {
  const [selectValue, setSelectValue] = useState("");

  const setValueOnChange: React.ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    const { value } = target;

    setSelectValue(value);
  };

  return { selectValue, setSelectValue, setValueOnChange };
};

export default useSelect;
