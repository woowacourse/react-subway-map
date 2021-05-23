import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DEFAULT_SERVER, LS_KEY } from './constants';
import { getLocalStorage, setLocalStorage } from './utils';
import GlobalStyle from './globalStyle';

if (!getLocalStorage(LS_KEY.SERVER)) {
  setLocalStorage(LS_KEY.SERVER, DEFAULT_SERVER);
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
