import React from 'react';
import GlobalStyle from '../src/Global.styles';
import StoryRouter from 'storybook-react-router';

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
      {/* <div style={{ height: '100vh' }}> */}
      <Story />
      {/* </div> */}
    </>
  ),
];
