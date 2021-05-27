import React from 'react';
import GlobalStyle from '../src/Global.styles';
import StoryRouter from 'storybook-react-router';
import { Provider } from 'react-redux';
import { store } from '../src/state/store';
import { QueryClient, QueryClientProvider } from 'react-query';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
const queryClient = new QueryClient();

export const decorators = [
  StoryRouter(),
  (Story) => (
    <>
      <GlobalStyle />
      <div style={{ height: '100vh' }}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Story />
          </Provider>
        </QueryClientProvider>
      </div>
    </>
  ),
];
