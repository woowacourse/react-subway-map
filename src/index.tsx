import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SnackBarProvider from './contexts/SnackBarProvider';
import ThemeProvider from './contexts/ThemeContextProvider';
import UserProvider from './contexts/UserContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './GlobalStyle';
import LoadingProvider from './contexts/LoadingContext';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider>
      <SnackBarProvider>
        <UserProvider>
          <LoadingProvider>
            <Router>
              <App />
            </Router>
          </LoadingProvider>
        </UserProvider>
      </SnackBarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
