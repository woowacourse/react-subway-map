import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SnackBarProvider from './contexts/SnackBarProvider';
import ThemeProvider from './contexts/ThemeContextProvider';

import GlobalStyle from './GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider>
      <SnackBarProvider>
        <App />
      </SnackBarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
