import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from './GlobalStyle';
import Routes from './routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
