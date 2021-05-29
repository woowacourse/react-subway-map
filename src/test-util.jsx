import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { render } from '@testing-library/react';
import { ROUTE } from './constants';
import { globalStyle } from 'App.styles';

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      maxSnack={3}
    >
      <Global styles={globalStyle} />
      <MemoryRouter initialEntries={[ROUTE.HOME]}>{children}</MemoryRouter>
    </SnackbarProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
