import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from '../src/GlobalStyle';
import { store } from '../src/store';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  ),
];
