import { useState } from "react";

type Validator = (value: string) => void | never;

const useInput = (validator: Validator) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChange: React.FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    setInputValue(value);
  };

  const onBlur: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    try {
      validator(value);

      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return { inputValue, errorMessage, onChange, onBlur, setInputValue };
};

export default useInput;
