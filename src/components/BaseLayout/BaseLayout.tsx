import React from 'react';
import NavBar from 'components/NavBar/NavBar';
import Styled from './BaseLayout.styles';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Styled.Container>
      <NavBar />
      {children}
    </Styled.Container>
  );
};

export default BaseLayout;
