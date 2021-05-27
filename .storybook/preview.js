import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/react';
import store from 'modules/store';
import { globalStyle, theme } from '../src/App.styles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((story) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Router>{story()}</Router>
    </ThemeProvider>
  </Provider>
));

configure(require.context('../src', true, /\.stories\.js?$/), module);
