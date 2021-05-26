import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ROUTE } from '../../../constants';
import { IAccessToken } from '../../../features/accessTokenSlice';
import {
  unValidAccessTokenState,
  unValidSignedUser,
  validHostState,
} from '../../../fixtures/useSelectorState';
import Login from './Login';

jest.mock('react-redux');

describe('Login', () => {
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => true);
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());
  });

  it('로그인 페이지에서 유효한 이메일/비밀번호를 입력 후 로그인 버튼을 눌렀을 때, 홈페이지로 이동한다.', () => {
    const accessToken: IAccessToken = {
      accessToken: null,

      isError: null,
      status: null,
    };

    (useSelector as jest.Mock).mockImplementation(() => {
      return {
        signedUser: unValidSignedUser,
        accessTokenState: unValidAccessTokenState,
        hostState: validHostState,
      };
    });

    const login = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const signUpButton = login.getByRole('link', {
      name: /회원가입/i,
    });
    const emailInput = login.getByLabelText('이메일');
    const passwordInput = login.getByLabelText('비밀번호');

    fireEvent.change(emailInput, { target: { value: 'test8@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '111111' } });
    fireEvent.click(signUpButton);

    accessToken.accessToken = 'valid accessToken';

    expect(window.location.pathname).toEqual(ROUTE.SIGNUP);
  });

  it('로그인 페이지에서 회원가입 버튼을 눌렀을때, 회원가입 페이지로 이동한다.', () => {
    (useSelector as jest.Mock).mockImplementation(() => {
      return {
        signedUser: unValidSignedUser,
        accessTokenState: unValidAccessTokenState,
        hostState: validHostState,
      };
    });

    const login = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );

    const signUpButton = login.getByRole('link', {
      name: /회원가입/i,
    });

    fireEvent.click(signUpButton);

    expect(window.location.pathname).toEqual(ROUTE.SIGNUP);
  });
});
