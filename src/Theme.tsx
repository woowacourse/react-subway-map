import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { MAIN_COLOR } from './constants/styleConstant';
import { RootState } from './modules';

interface Props {
  children?: React.ReactNode;
}

const Theme = ({ children }: Props) => {
  const serverName = useSelector((state: RootState) => state.user.serverName);
  return (
    <ThemeProvider
      theme={{
        primaryColor: MAIN_COLOR.PRIMARY(serverName ? serverName : 'default'),
        secondaryColor: MAIN_COLOR.SECONDARY(serverName ? serverName : 'default'),
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default Theme;
