import React from 'react';
import NavBar from 'components/NavBar/NavBar';
import Styled from './BaseLayout.styles';
import { useAppSelector } from 'modules/hooks';
import { SERVER, KOREAN_SERVER } from 'constants/api';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const BASE_URL = useAppSelector((state) => state.serverSlice.server);
  const user = useAppSelector((state) => state.authSlice.data);
  const server = Object.keys(SERVER).find((key) => SERVER[key] === BASE_URL);

  return (
    <Styled.Container>
      <NavBar />
      {user && server && (
        <Styled.CurrentServer>🟢 현재서버: {KOREAN_SERVER[server]}</Styled.CurrentServer>
      )}
      {children}
    </Styled.Container>
  );
};

export default BaseLayout;
