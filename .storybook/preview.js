import React from 'react';
import GlobalStyle from '../src/Global.styles';
import StoryRouter from 'storybook-react-router';
import { Provider } from 'react-redux';
import { store } from '../src/state/store';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../src/index';
import { Suspense } from 'react';
import { addDecorator } from '@storybook/react';
import { initializeWorker, mswDecorator } from 'msw-storybook-addon';

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
  initializeWorker(),
  StoryRouter(),
  (Story) => (
    <>
      <mswDecorator>
        <GlobalStyle />
        <div style={{ height: '100vh' }}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <Suspense fallback={false}>
                <Story />
              </Suspense>
            </Provider>
          </QueryClientProvider>
        </div>
      </mswDecorator>
    </>
  ),
];
