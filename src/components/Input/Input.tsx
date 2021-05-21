import React, { InputHTMLAttributes } from 'react';
import * as Styled from './Input.styles';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  labelText?: string;
}

const Input = ({ icon, labelText = '', ...props }: IProps) => {
  return (
    <Styled.Label>
      <Styled.LabelText>{labelText}</Styled.LabelText>
      {icon && <Styled.Icon>{icon}</Styled.Icon>}
      <Styled.Input hasIcon={!!icon} {...props} />
    </Styled.Label>
  );
};

export default Input;
