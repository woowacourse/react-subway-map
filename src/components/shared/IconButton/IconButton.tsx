import React from 'react';
import Styled from './IconButton.styles';

interface IconButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: React.ReactNode;
  onClick?: () => void;
}

const IconButton = ({ type, children, onClick }: IconButtonProps) => {
  return (
    <Styled.Container type={type} onClick={onClick}>
      {children}
    </Styled.Container>
  );
};

export default IconButton;
