import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { theme } from './GlobalStyle';
import { store } from './store';

// eslint-disable-next-line react/prop-types
const ProviderWrapper = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Router>{children}</Router>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

const customRender = (ui, options) => render(ui, { wrapper: ProviderWrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };
