import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configure, addDecorator } from '@storybook/react';
import { Global } from '@emotion/react';
import store from 'modules/store';
import { globalStyle } from '../src/App.styles';

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
    <Global styles={globalStyle} />
    <Router>{story()}</Router>
  </Provider>
));

configure(require.context('../src', true, /\.stories\.js?$/), module);
