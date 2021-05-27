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
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  value,
  labelText,
  placeholder,
  onBlur,
  onChange,
  extraArgs,
}: InputProps) => {
  return (
    <Styled.Label>
      {labelText}
      <Styled.Input
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        required
        {...extraArgs}
      />
    </Styled.Label>
  );
};

export default Input;
