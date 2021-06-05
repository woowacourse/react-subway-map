import React from 'react';
import Styled from './Input.styles';

interface InputProps {
  type: string;
  labelText: string;
  value?: string | number;
  placeholder?: string;
  extraArgs?: {
    min?: string;
    max?: string;
    minLength?: number;
    maxLength?: number;
  };
  icon?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  value,
  labelText,
  placeholder,
  icon,
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
        icon={icon}
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
