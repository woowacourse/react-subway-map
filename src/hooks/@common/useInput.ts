import { useState } from "react";

type Validator = (value: string) => void | never;

const useInput = (validator: Validator) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (value: string) => {
    if (!validator) return;

    try {
      validator(value);

      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const setValueOnChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    setInputValue(value);

    validate(value);
  };

  return { inputValue, errorMessage, setValueOnChange, setInputValue };
};

export default useInput;
