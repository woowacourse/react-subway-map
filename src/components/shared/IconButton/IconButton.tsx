import React from 'react';
import Styled from './IconButton.styles';

interface IconButtonProps {
  children: React.ReactNode;
}

const IconButton = ({ children }: IconButtonProps) => {
  return <Styled.Container>{children}</Styled.Container>;
};

export default IconButton;
