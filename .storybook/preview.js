import React from 'react';
import GlobalStyle from '../src/Global.styles';
import StoryRouter from 'storybook-react-router';
import { Provider } from 'react-redux';
import { store } from '../src/state/store';

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
  StoryRouter(),
  (Story) => (
    <>
      <GlobalStyle />
      <div style={{ height: '100vh' }}>
        <Provider store={store}>
          <Story />
        </Provider>
      </div>
    </>
  ),
];
