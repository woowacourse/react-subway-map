import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useSignUp from '../hooks/useSignUp';
import { beforeEachFn, mockAlert, Wrapper } from './common';

beforeEach(beforeEachFn);

describe('useSignup', () => {
  test('사용자는 회원가입 할 수 있다.', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSignUp(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setEmail('test@test.test');
    });

    act(() => {
      result.current.setAge(21);
    });

    act(() => {
      result.current.setPassword('password');
    });

    act(() => {
      result.current.setPasswordForValidation('password');
    });

    act(() => {
      result.current.signUp();
    });

    await waitForNextUpdate();

    await waitFor(() => expect(mockAlert).toBeCalled());
  });
});
