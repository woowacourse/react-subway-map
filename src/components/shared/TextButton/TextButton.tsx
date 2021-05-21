import React from 'react';
import Styled from './TextButton.styles';
import { ButtonType } from 'types';

interface TextButtonProps {
  text: string;
  styleType: ButtonType;
}

const TextButton = ({ text, styleType }: TextButtonProps) => {
  return <Styled.Container styleType={styleType}>{text}</Styled.Container>;
};

export default TextButton;
