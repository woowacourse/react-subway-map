import { InputHTMLAttributes } from "react";
import { ErrorMessage, InputBlock } from "./Input.styles";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string | null;
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
