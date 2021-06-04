import React from 'react';
import Styled from './Button.styles';
import { ButtonWidth, ButtonType } from 'types';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  styleType: ButtonType;
  widthType?: ButtonWidth;
  isSelected?: boolean;
  children: React.ReactNode;

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  type,
  disabled,
  children,
  styleType,
  widthType = ButtonWidth.AUTO,
  isSelected,
  onClick,
}: Props) => {
  return (
    <Styled.Container
      type={type}
      disabled={disabled}
      styleType={styleType}
      widthType={widthType}
      isSelected={isSelected}
      onClick={onClick}
    >
      {children}
    </Styled.Container>
  );
};

export default Button;
