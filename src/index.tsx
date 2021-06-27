import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import GlobalStyle from './Global.styles';
import { store } from './state/store';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { suspense: true },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={true}>
              <App />
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
