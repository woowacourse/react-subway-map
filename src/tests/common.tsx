import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../mocks/server';
import { store } from '../state/store';

interface WrapperProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export const mockAlert = jest.fn();
export const mockConfirm = jest.fn();
export const mockHistoryPush = jest.fn();

export const beforeEachFn = () => {
  server.listen();
  let confirmSpy = jest.spyOn(window, 'confirm');
  confirmSpy.mockImplementation(jest.fn(() => true));
  window.alert = mockAlert;

  jest.mock('react-router-dom', () => ({
    useHistory: () => ({ push: mockHistoryPush }),
  }));
};
