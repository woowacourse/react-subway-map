import React from 'react';
import Styled from './TextButton.styles';
import { ButtonSize, ButtonType } from 'types';

interface TextButtonProps {
  text: string;
  styleType: ButtonType;
  sizeType?: ButtonSize;
  isSelected?: boolean;
  onClick?: () => void;
}

const TextButton = ({
  text,
  styleType,
  sizeType = ButtonSize.SMALL,
  isSelected,
  onClick,
}: TextButtonProps) => {
  return (
    <Styled.Container
      styleType={styleType}
      sizeType={sizeType}
      isSelected={isSelected}
      onClick={onClick}
    >
      {text}
    </Styled.Container>
  );
};

export default TextButton;
