import * as React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/react';
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
  <ThemeProvider theme={theme}>
    <Global styles={globalStyle} />
    <Router>{story()}</Router>
  </ThemeProvider>
));

configure(require.context('../src', true, /\.stories\.js?$/), module);
