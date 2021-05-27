import { useState } from "react";

export const useInput = (validator, replacement = "") => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.value.replace(replacement, "");

    setValue(newValue);

    if (validator) {
      setIsValid(validator(newValue));
    }
  };

  const reset = () => setValue("");

  return [value, handleChange, isValid, reset];
};
