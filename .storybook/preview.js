import { configure, addDecorator } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from '../src/GlobalStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator(style => (
  <>
    <GlobalStyle />
    <Router>{style()}</Router>
  </>
));

configure(require.context('../src', true, /\.stories\.js?$/), module);
