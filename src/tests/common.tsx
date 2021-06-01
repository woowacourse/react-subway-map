import { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../state/store';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

export const mockAlert = jest.fn();
export const mockHistoryPush = jest.fn();

export const beforeEachFn = () => {
  window.alert = mockAlert;
  jest.mock('react-router-dom', () => ({
    useHistory: () => ({ push: mockHistoryPush }),
  }));
};
