import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { rootReducer, rootSaga } from './modules';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Theme from './Theme';
import GlobalStyles from './Global.styles';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

axios.interceptors.response.use(
  response => response,
  error => error.response
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Theme>
          <GlobalStyles />
          <App />
        </Theme>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
