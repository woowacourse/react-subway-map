import React from 'react';
import Styled from './TextButton.styles';
import { ButtonType } from 'types';

interface TextButtonProps {
  text: string;
  styleType: ButtonType;
  onClick?: () => void;
}

const TextButton = ({ text, styleType, onClick }: TextButtonProps) => {
  return (
    <Styled.Container styleType={styleType} onClick={onClick}>
      {text}
    </Styled.Container>
  );
};

export default TextButton;
