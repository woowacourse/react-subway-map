import '@testing-library/jest-dom';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import SignupPage from './SignupPage';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constants/messages';

const BASE_URL = 'https://subwaybot.n-e.kr';
const EMAIL = 'test@test.com';
const AGE = 7;
const PASSWORD = '12341234';
const INVALID_EMAIL = 'test';
const INVALID_AGE = 301;
const INVALID_PASSWORD = '패스';

// SignupPage test
describe('사용자는 회원가입을 할 수 있다.', () => {
  const server = setupServer(
    rest.post(`${BASE_URL}/api/members`, (req, res, ctx) => {
      return res(ctx.status(201));
    })
  );

  beforeEach(() => {
    render(
      <Router>
        <Route exact path="/">
          main
        </Route>
        <Route exact path="/signup">
          <SignupPage setIsLoading={() => {}} />
        </Route>
        <Redirect to="/signup" />
      </Router>
    );

    history.pushState({ value: '' }, '', '/signup');
  });

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('사용자는 유효한 정보를 입력해서 회원가입을 할 수 있다.', async () => {
    const emailInput = screen.getByLabelText('이메일 입력');
    const ageInput = screen.getByLabelText('나이 입력');
    const passwordInput = screen.getByLabelText('비밀번호 입력');
    const passwordConfirmInput = screen.getByLabelText('비밀번호 확인 입력');
    const signupButton = screen.getByRole('button', {
      name: /회원가입/i,
    });

    fireEvent.change(emailInput, { target: { value: EMAIL } });
    fireEvent.change(ageInput, { target: { value: AGE } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.change(passwordConfirmInput, { target: { value: PASSWORD } });
    fireEvent.click(signupButton);

    await waitFor(() => expect(window.location.pathname).toBe('/login'));
  });

  it('유효하지 않은 형식의 이메일을 입력하면 에러메시지를 보여준다.', async () => {
    const emailInput = screen.getByLabelText('이메일 입력');
    fireEvent.change(emailInput, { target: { value: INVALID_EMAIL } });

    await waitFor(() => screen.getByText(ERROR_MESSAGE.INVALID_EMAIL));
  });

  it('이미 가입된 이메일을 입력하면 에러메시지를 보여준다.', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/members`, (req, res, ctx) => {
        return res(ctx.json(true));
      })
    );

    const emailInput = screen.getByLabelText('이메일 입력');
    fireEvent.change(emailInput, { target: { value: EMAIL } });

    await waitFor(() => screen.getByText(ERROR_MESSAGE.DUPLICATED_EMAIL));
  });

  it('이메일이 이용가능한 경우 안내메시지를 보여준다.', async () => {
    server.use(
      rest.get(`${BASE_URL}/api/members`, (req, res, ctx) => {
        return res(ctx.json(false));
      })
    );

    const emailInput = screen.getByLabelText('이메일 입력');
    fireEvent.change(emailInput, { target: { value: EMAIL } });

    await waitFor(() => screen.getByText(SUCCESS_MESSAGE.AVAILABLE_EMAIL));
  });

  it('유효하지 않은 나이를 입력하면 에러메시지를 보여준다.', async () => {
    const ageInput = screen.getByLabelText('나이 입력');
    fireEvent.change(ageInput, { target: { value: INVALID_AGE } });

    await waitFor(() => screen.getByText(ERROR_MESSAGE.INVALID_AGE));
  });

  it('유효하지 않은 비밀번호를 입력하면 에러메시지를 보여준다.', async () => {
    const passwordInput = screen.getByLabelText('비밀번호 입력');
    fireEvent.change(passwordInput, { target: { value: INVALID_PASSWORD } });

    await waitFor(() => screen.getByText(ERROR_MESSAGE.INVALID_PASSWORD));
  });

  it('비밀번호와 비밀번호 확인의 입력이 다르면 에러메시지를 보여준다.', async () => {
    const passwordInput = screen.getByLabelText('비밀번호 입력');
    const passwordConfirmInput = screen.getByLabelText('비밀번호 확인 입력');
    fireEvent.change(passwordInput, { target: { value: PASSWORD } });
    fireEvent.change(passwordConfirmInput, { target: { value: PASSWORD + '123' } });

    await waitFor(() => screen.getByText(ERROR_MESSAGE.INVALID_PASSWORD_CONFIRM));
  });
});
