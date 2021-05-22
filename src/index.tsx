import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SnackBarProvider from './components/SnackBarProvider/SnackBarProvider';

import GlobalStyle from './GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <SnackBarProvider>
      <App />
    </SnackBarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
