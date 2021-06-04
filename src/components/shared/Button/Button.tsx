import React, { ButtonHTMLAttributes } from 'react';
import Styled from './Button.styles';
import { ButtonWidth, ButtonType } from 'types';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType: ButtonType;
  widthType?: ButtonWidth;
  isSelected?: boolean;
  children: React.ReactNode;
}

const Button = ({
  children,
  styleType,
  widthType = ButtonWidth.AUTO,
  isSelected,
  ...props
}: Props) => {
  return (
    <Styled.Container
      styleType={styleType}
      widthType={widthType}
      isSelected={isSelected}
      {...props}
    >
      {children}
    </Styled.Container>
  );
};

export default Button;
