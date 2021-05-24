import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SnackBarProvider from './contexts/SnackBarProvider';
import ThemeProvider from './contexts/ThemeContextProvider';
import UserProvider from './contexts/UserContextProvider';

import GlobalStyle from './GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider>
      <SnackBarProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </SnackBarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
