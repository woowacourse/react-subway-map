import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ROUTE } from '../../../constants';
import { ISignedUser } from '../../../features/signedUserSlice';
import Login from './Login';

jest.mock('react-redux');

describe('Login', () => {
  beforeAll(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => true);
  });

  it('로그인 페이지에서 유효한 이메일/비밀번호를 입력 후 로그인 버튼을 눌렀을 때, 홈페이지로 이동한다.', () => {
    const signedUser: ISignedUser = {
      id: 909090,
      email: 'test@test.com',
      age: 12,
      accessToken: '123213213',
    };

    (useSelector as jest.Mock).mockImplementation(() => {
      return signedUser;
    });
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());

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

    expect(window.location.pathname).toEqual(ROUTE.SIGNUP);
  });

  it('로그인 페이지에서 회원가입 버튼을 눌렀을때, 회원가입 페이지로 이동한다.', () => {
    const signedUser: ISignedUser = {
      id: null,
      email: null,
      age: null,
      accessToken: null,
    };

    (useSelector as jest.Mock).mockImplementation(() => {
      return signedUser;
    });
    (useDispatch as jest.Mock).mockImplementation(() => jest.fn());

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
