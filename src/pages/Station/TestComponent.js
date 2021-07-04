import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';

import stationReducer from '../../redux/stationSlice';
import userReducer from '../../redux/userSlice';

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
