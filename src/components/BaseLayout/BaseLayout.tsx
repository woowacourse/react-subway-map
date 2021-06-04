import React from 'react';
import * as Styled from './BaseLayout.styles';
import { Header, Navbar, ServerSelector } from '..';

interface Props {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <Styled.PageContainer>{children}</Styled.PageContainer>
      <ServerSelector />
    </>
  );
};

export default BaseLayout;
