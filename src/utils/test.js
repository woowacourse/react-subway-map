import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import stationReducer from '../redux/stationSlice';
import userReducer from '../redux/userSlice';

function render(
  ui,
  {
    initialState,
    store = createStore({ user: userReducer, station: stationReducer }, initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
