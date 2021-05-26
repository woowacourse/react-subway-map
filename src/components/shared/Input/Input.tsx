import React from 'react';
import Styled from './Input.styles';

interface InputProps {
  type: string;
  labelText: string;
  value?: string | number;
  placeholder?: string;
  extraArgs?: {
    min?: string;
    minLength?: number;
    maxLength?: number;
  };
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, value, labelText, placeholder, onChange, extraArgs }: InputProps) => {
  return (
    <Styled.Label>
      {labelText}
      <Styled.Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        {...extraArgs}
      />
    </Styled.Label>
  );
};

export default Input;
