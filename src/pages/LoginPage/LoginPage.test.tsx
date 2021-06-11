import '@testing-library/jest-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import apiRequest from '../../request';

import LoginPage from './LoginPage';
import { ERROR_MESSAGE } from '../../constants/messages';
import ERROR_TYPE from '../../constants/errorType';

const BASE_URL = 'https://subwaybot.n-e.kr';
const EMAIL = 'test@test.com';
const PASSWORD = '12341234';

describe('사용자는 로그인을 할 수 있다.', () => {
  beforeEach(() => {
    apiRequest.login = jest.fn().mockImplementation(() => {
      return { ok: true, data: 'peterbeuccolsunny' };
    });

    render(
      <Router>
        <Route exact path="/">
          main
        </Route>
        <Route exact path="/login">
          <LoginPage setIsLoading={() => {}} />
        </Route>
        <Redirect to="/login" />
      </Router>
    );

    history.pushState({ value: '' }, '', '/login');
  });

  it('아이디와 비밀번호를 입력하면 로그인을 하고, 메인페이지로 이동한다.', async () => {
    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const loginButton = screen.getByRole('button', {
      name: /로그인/i,
    });

    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });

  it('유효하지 않은 계정 정보를 입력하면 에러메시지를 보여준다.', async () => {
    apiRequest.login = jest.fn().mockImplementation(() => {
      return {
        ok: false,
        error: { type: ERROR_TYPE.INVALID_LOGIN_INFO, message: ERROR_MESSAGE.LOGIN },
      };
    });

    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const loginButton = screen.getByRole('button', {
      name: /로그인/i,
    });

    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.click(loginButton);

    await waitFor(() => screen.getByText(ERROR_MESSAGE.LOGIN));
  });

  it('이메일 혹은 패스워드가 입력되지 않으면 에러메시지를 보여준다.', async () => {
    const emailInput = screen.getByLabelText('이메일');
    const passwordInput = screen.getByLabelText('비밀번호');
    const loginButton = screen.getByRole('button', {
      name: /로그인/i,
    });

    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);

    await waitFor(() => screen.getByText(ERROR_MESSAGE.INCOMPLETE_LOGIN_FORM));

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.click(loginButton);

    await waitFor(() => screen.getByText(ERROR_MESSAGE.INCOMPLETE_LOGIN_FORM));
  });
});
