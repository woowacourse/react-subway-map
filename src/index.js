import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DEFAULT_SERVER, LS_KEY } from './constants';
import { getLocalStorage, setLocalStorage } from './utils';
import GlobalStyle from './globalStyle';
import { Provider } from 'react-redux';
import store, { setUserToken, getStationsThunk, getLinesThunk } from './redux';

if (!getLocalStorage(LS_KEY.SERVER)) {
  setLocalStorage(LS_KEY.SERVER, DEFAULT_SERVER);
}

const userToken = getLocalStorage(LS_KEY.TOKEN);

if (userToken) {
  store.dispatch(setUserToken({ token: userToken }));
  store.dispatch(getStationsThunk());
  store.dispatch(getLinesThunk());
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
