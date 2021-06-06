import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import userReducer from '../redux/userSlice';
import stationReducer from '../redux/stationSlice';

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
