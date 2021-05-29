import React from 'react';

import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { customRender } from '../../test-utils';

import Login from './Login';
import { requestLogin } from '../../api/member';
import { PAGE_INFO } from '../../constants/appInfo';

jest.mock('../../api/member');

describe('Login', () => {
  it('Login 페이지를 렌더링한다.', () => {
    const { container } = customRender(<Login />);

    expect(container).toHaveTextContent(PAGE_INFO.LOGIN.text);
  });

  it('사용자는 로그인 할 수 있다.', async () => {
    const screen = customRender(<Login />);
    const loginForm = screen.getByRole('form');

    requestLogin.mockImplementation(async () => ({
      data: {
        accessToken: 'token',
      },
    }));

    act(() => {
      fireEvent.submit(loginForm, {
        target: {
          email: 'test@test.com',
          password: '123456',
        },
      });
    });

    expect(requestLogin).toBeCalled();
  });
});
