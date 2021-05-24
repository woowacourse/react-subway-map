import { useState } from "react";
import { isValidAge, isValidEmail, isValidPassword } from "./validator";

export const useSignupInput = (validator, replacement = "") => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.value.replace(replacement, "");

    setValue(newValue);
    setIsValid(validator(newValue));
  };

  return [value, isValid, handleChange];
};

export const useSignupEmail = () => useSignupInput(isValidEmail);

export const useSignupAge = () => useSignupInput(isValidAge, /[^0-9]/g);

export const useSignupPassword = () => useSignupInput(isValidPassword);
