import { InputHTMLAttributes } from 'react';
import { StyledInput } from './Input.styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  ariaLabel?: string;
}

const Input = ({ type = 'text', ariaLabel, ...props }: InputProps) => (
  <StyledInput type={type} aria-label={ariaLabel} {...props} />
);

export default Input;
