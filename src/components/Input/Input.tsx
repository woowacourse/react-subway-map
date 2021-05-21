import React, { InputHTMLAttributes } from 'react';
import * as Styled from './Input.styles';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = ({ icon, ...props }: IProps) => {
  return (
    <Styled.InputWrapper>
      {icon && <Styled.Icon>{icon}</Styled.Icon>}
      <Styled.Input hasIcon={!!icon} {...props} />
    </Styled.InputWrapper>
  );
};

export default Input;
