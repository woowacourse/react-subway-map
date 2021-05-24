import React from 'react';
import Styled from './TextButton.styles';
import { ButtonSize, ButtonType } from 'types';

interface TextButtonProps {
  text: string;
  styleType: ButtonType;
  sizeType?: ButtonSize;
  onClick?: () => void;
}

const TextButton = ({ text, styleType, sizeType = ButtonSize.SMALL, onClick }: TextButtonProps) => {
  return (
    <Styled.Container styleType={styleType} sizeType={sizeType} onClick={onClick}>
      {text}
    </Styled.Container>
  );
};

export default TextButton;
