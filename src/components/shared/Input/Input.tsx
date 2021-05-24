import React from 'react';
import Styled from './Input.styles';

interface InputProps {
  type: string;
  value?: string;
  labelText: string;
  placeholder?: string;
  extraArgs?: {
    min: string;
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
        {...extraArgs}
      />
    </Styled.Label>
  );
};

export default Input;
