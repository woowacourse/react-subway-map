import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from './GlobalStyle';
import Routes from './routes';
import { store } from './store';
import BaseLayout from './components/BaseLayout/BaseLayout';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <GlobalStyle />
          <Router basename="/react-subway-map">
            <BaseLayout>
              <Routes />
            </BaseLayout>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
