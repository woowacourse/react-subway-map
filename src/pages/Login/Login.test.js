import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Login from './Login';
import { customRender } from '../../test-utils';
import { act } from 'react-dom/test-utils';
import { requestLogin } from '../../api/member';

jest.mock('../../api/member');

describe('로그인 페이지 테스트', () => {
  beforeEach(() => {
    customRender(<Login />);
  });

  it('로그인 요청', async () => {
    const loginForm = screen.getByRole('form');

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

  it('회원가입 페이지로 이동', async () => {
    const linkToSignUp = screen.getByRole('link', {
      name: '아직 회원이 아니신가요?',
    });

    act(() => {
      fireEvent.click(linkToSignUp);
    });

    expect(window.location.pathname).toEqual('/signup');
  });
});
