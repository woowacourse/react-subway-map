import { InputHTMLAttributes } from "react";
import { ErrorMessage, InputBlock, InputStylesProps } from "./Input.styles";

export interface Props extends InputStylesProps, InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
}

const Input = ({ errorMessage, ...props }: Props) => {
  return (
    <>
      <InputBlock {...props} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};

export default Input;
