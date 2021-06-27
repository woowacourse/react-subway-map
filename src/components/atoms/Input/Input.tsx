import { InputHTMLAttributes } from 'react';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import { StyledInput } from './Input.styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  ariaLabel?: string;
}

const Input = ({ type = 'text', ariaLabel, name, ...props }: InputProps) => {
  const { state, onChange } = useFormContext();

  return (
    <StyledInput
      name={name}
      value={state[name]?.value || ''}
      onChange={onChange}
      type={type}
      aria-label={ariaLabel}
      {...props}
    />
  );
};

export default Input;
