import { renderHook } from '@testing-library/react-hooks';
import { FC } from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { mockToken } from '../mocks/mockData';
import { store } from '../state/store';

beforeEach(() => {
  window.alert = jest.fn();
  jest.mock('react-router-dom', () => ({
    useHistory: () => ({ push: jest.fn() }),
  }));
});

interface useLoginProps {
  children: React.ReactNode;
}

describe('useLogin', () => {
  test('사용자는 로그인 할 수 있다.', async () => {
    const wrapper: FC<useLoginProps> = ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
    const { result, waitForNextUpdate } = renderHook(() => useLogin(), {
      wrapper,
    });

    act(() => {
      result.current.setEmail('test@test.test');
      result.current.setPassword('test@test.test');
      result.current.login();
    });

    await waitForNextUpdate();

    expect(result.current.accessToken).toBe(mockToken);
  });

  test('사용자는 로그아웃 할 수 있다.', () => {});
});
