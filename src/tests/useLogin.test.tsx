import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useLogin from '../hooks/useLogin';
import { mockToken } from '../mocks/mockData';
import { beforeEachFn } from './common';
import { Wrapper } from './common';

beforeEach(beforeEachFn);

describe('useLogin', () => {
  test('사용자는 로그인 할 수 있다.', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useLogin(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setEmail('test@test.test');
    });

    act(() => {
      result.current.setPassword('test@test.test');
    });

    act(() => {
      result.current.login();
    });

    await waitForNextUpdate();

    expect(result.current.accessToken).toBe(mockToken);
  });

  test('사용자는 로그아웃 할 수 있다.', () => {
    const { result } = renderHook(() => useLogin(), { wrapper: Wrapper });

    act(() => {
      result.current.logout();
    });

    expect(result.current.accessToken).toBe('');
  });
});
