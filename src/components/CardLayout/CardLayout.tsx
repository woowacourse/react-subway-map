import React from 'react';
import Styled from './CardLayout.styles';

interface CardLayoutProps {
  title: string;
  children: React.ReactNode;
}

const CardLayout = ({ title, children }: CardLayoutProps) => {
  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      <Styled.Content>{children}</Styled.Content>
    </Styled.Container>
  );
};

export default CardLayout;
