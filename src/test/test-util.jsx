import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Global } from '@emotion/react';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { API_STATUS } from 'constants/api';
import { globalStyle } from 'App.styles';

const user = {
  id: 1,
  email: 'zig1@email.com',
  age: 20,
};

const mockStore = configureStore({
  reducer: {
    authSlice: () => ({ data: user, status: API_STATUS.FULFILLED }),
    serverSlice: () => ({ server: '' }),
  },
});

// eslint-disable-next-line react/prop-types
const ProviderWrapper = ({ children }) => {
  return (
    <Provider store={mockStore}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        maxSnack={3}
      >
        <Global styles={globalStyle} />
        <BrowserRouter>{children}</BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: ProviderWrapper, ...options });

export * from '@testing-library/react';

export { customRender as render };
