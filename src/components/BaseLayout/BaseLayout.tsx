import React from 'react';
import NavBar from 'components/NavBar/NavBar';
import Styled from './BaseLayout.styles';
import CardLayout from 'components/CardLayout/CardLayout';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Styled.Container>
      <NavBar />
      {children}
      <CardLayout title={'여기는 제목'} />
    </Styled.Container>
  );
};

export default BaseLayout;
