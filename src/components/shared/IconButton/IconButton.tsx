import React from 'react';
import Styled from './IconButton.styles';

interface IconButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: React.ReactNode;
}

const IconButton = ({ type, children }: IconButtonProps) => {
  return <Styled.Container type={type}>{children}</Styled.Container>;
};

export default IconButton;
