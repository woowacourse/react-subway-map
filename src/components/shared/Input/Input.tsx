import React, { InputHTMLAttributes } from 'react';
import Styled from './Input.styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  icon?: string;
}

const Input = ({ labelText, icon, ...props }: Props) => {
  return (
    <Styled.Label>
      {labelText}
      <Styled.Input icon={icon} {...props} required />
    </Styled.Label>
  );
};

export default Input;
