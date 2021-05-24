import React from 'react';
import Styled from './Input.styles';

interface InputProps {
  type: string;
  value?: string;
  labelText: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, value, labelText, placeholder, onChange }: InputProps) => {
  return (
    <Styled.Label>
      {labelText}
      <Styled.Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </Styled.Label>
  );
};

export default Input;
