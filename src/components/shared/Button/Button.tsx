import React from 'react';
import Styled from './Button.styles';
import { ButtonSize, ButtonType } from 'types';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  styleType: ButtonType;
  sizeType?: ButtonSize;
  isSelected?: boolean;
  children: React.ReactNode;

  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  type,
  disabled,
  children,
  styleType,
  sizeType = ButtonSize.SMALL,
  isSelected,
  onClick,
}: Props) => {
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
