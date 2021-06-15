import { InputHTMLAttributes, useEffect } from "react";

import Input from "../Input/Input";

import useForm from "../../hooks/useForm";
import { Validator } from "../../@types/form";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  validator: Validator;
  name: string;
}

const InputField = ({ validator, name, ...props }: Props) => {
  const { values, onChange, errorMessages, register, unregister } = useForm();

  useEffect(() => {
    register(name, { validator });

    return () => {
      unregister(name);
    };
  });

  return (
    <Input
      value={values[name] || ""}
      name={name}
      errorMessage={errorMessages[name]}
      onChange={onChange}
      {...props}
    />
  );
};

export default InputField;
