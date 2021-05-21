import React from 'react';
import Styled from './Input.styles';

interface InputProps {
  type: string;
  labelText: string;
}

const Input = ({ type, labelText }: InputProps) => {
  return (
    <Styled.Label>
      {labelText}
      <Styled.Input type={type}></Styled.Input>
    </Styled.Label>
  );
};

export default Input;
