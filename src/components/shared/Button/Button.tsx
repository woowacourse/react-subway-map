import React from 'react';
import Styled from './Button.styles';
import { ButtonSize, ButtonType } from 'types';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  styleType: ButtonType;
  sizeType?: ButtonSize;
  isSelected?: boolean;
  children: React.ReactNode;

  onClick?: () => void;
}

const Button = ({
  type,
  disabled,
  children,
  styleType,
  sizeType = ButtonSize.SMALL,
  isSelected,
  onClick,
}: ButtonProps) => {
  return (
    <Styled.Container
      type={type}
      disabled={disabled}
      styleType={styleType}
      sizeType={sizeType}
      isSelected={isSelected}
      onClick={onClick}
    >
      {children}
    </Styled.Container>
  );
};

export default Button;
