import { InputHTMLAttributes } from "react";

import Input from "./Input";

import useForm from "../../hooks/useForm";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const InputField = ({ name, ...props }: Props) => {
  const { values, onChange, errorMessages } = useForm();

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
