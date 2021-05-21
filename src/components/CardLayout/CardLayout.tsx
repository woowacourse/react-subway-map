import React from 'react';
import Styled from './CardLayout.styles';

interface CardLayoutProps {
  title: string;
}

const CardLayout = ({ title }: CardLayoutProps) => {
  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Divider />
    </Styled.Container>
  );
};

export default CardLayout;
