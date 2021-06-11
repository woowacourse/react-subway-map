import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import * as Styled from './App.styles';
import { Header, Navbar, SelectServer } from './components';
import GlobalStyle, { theme } from './GlobalStyle';
import Routes from './routes';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <GlobalStyle />
          <Router>
            <Header>
              <Navbar />
            </Header>
            <Styled.PageContainer>
              <Routes />
            </Styled.PageContainer>
            <SelectServer />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
