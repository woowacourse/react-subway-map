import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SnackBarProvider from './components/shared/SnackBar/SnackBarProvider';
import ThemeProvider from './contexts/ThemeContextProvider';
import UserProvider from './contexts/UserContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider>
      <SnackBarProvider>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </SnackBarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
