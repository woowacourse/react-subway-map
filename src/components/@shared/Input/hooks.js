import { useState } from "react";

export const useInput = (validator, replacement) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const newValue = replacement
      ? event.target.value.replace(replacement, "")
      : event.target.value;

    setValue(newValue);

    if (validator) {
      setIsValid(validator(newValue));
    }
  };

  const reset = () => {
    setValue("");

    if (validator) {
      setIsValid(validator(""));
    }
  };

  return [value, handleChange, isValid, reset];
};
