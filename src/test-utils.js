import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';

// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender };
