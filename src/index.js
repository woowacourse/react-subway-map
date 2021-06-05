import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CookiesProvider } from 'react-cookie';
import { SnackbarProvider } from 'notistack';

import App from './App';
import store from './redux/store';
import { GlobalStyle } from './style';

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <CookiesProvider>
        <Router>
          <App />
        </Router>
      </CookiesProvider>
    </Provider>
    <GlobalStyle />
  </SnackbarProvider>,
  document.getElementById('root'),
);
