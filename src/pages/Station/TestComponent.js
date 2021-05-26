import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import userReducer from '../../redux/userSlice';
import stationReducer from '../../redux/stationSlice';

export const makeStore = () => {
  return configureStore({
    reducer: { user: userReducer, station: stationReducer },
  });
};

const wrapComponent = (Component, store = null, props = {}) => {
  return (
    <Provider store={store || makeStore()}>
      <Component {...props} />
    </Provider>
  );
};

export default wrapComponent;
