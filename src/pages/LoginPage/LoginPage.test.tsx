import '@testing-library/jest-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import LoginPage from './LoginPage';
import { ERROR_MESSAGE } from '../../constants/messages';

const BASE_URL = 'https://subwaybot.n-e.kr';
const EMAIL = 'test@test.com';
const PASSWORD = '12341234';

describe('사용자는 로그인을 할 수 있다.', () => {
  const server = setupServer(
    rest.post(`${BASE_URL}/api/login/token`, (req, res, ctx) => {
      return res(ctx.json({ accessToken: 'peterbeuccolsunny' }));
    })
  );

  beforeEach(() => {
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

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('아이디와 비밀번호를 입력하면 로그인을 하고, 메인페이지로 이동한다.', async () => {
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const loginButton = screen.getByRole('button', {
      name: /로그인/i,
    });

    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });

  it('유효하지 않은 계정 정보를 입력하면 에러메시지를 보여준다.', async () => {
    server.use(
      rest.post(`${BASE_URL}/api/login/token`, (req, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const loginButton = screen.getByRole('button', {
      name: /로그인/i,
    });

    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.click(loginButton);

    await waitFor(() => screen.getByText(ERROR_MESSAGE.LOGIN));
  });

  it('이메일 혹은 패스워드가 입력되지 않으면 에러메시지를 보여준다.', async () => {
    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
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
