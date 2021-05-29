/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import MESSAGE from '../../constants/message';
import { render, screen, waitFor, fireEvent } from '../../test-utils';
import LoginPage from './LoginPage';

const login = (email, password) => {
  const emailInput = screen.getByPlaceholderText(/이메일/);

  const passwordInput = screen.getByPlaceholderText(/비밀번호/);

  const loginButton = screen.getByRole('button', {
    name: /로그인/,
  });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  fireEvent.click(loginButton);
};

describe('로그인 페이지', () => {
  beforeEach(() => {
    render(<LoginPage />);
  });

  it('존재하는 유저 이메일과 비밀번호로 로그인할 수 있다.', async () => {
    const email = 'test@test.com';
    const password = 'testtest';

    login(email, password);

    const alertMessage = await waitFor(() => screen.getByRole('alert'));
    expect(alertMessage).toHaveTextContent(MESSAGE.SUCCESS.LOGIN);
  });

  it('존재하는 유저 이메일이지만 일치하지 않는 비밀번호로는 로그인할 수 없다.', async () => {
    const email = 'test@test.com';
    const password = 'wrongpassword';

    login(email, password);

    const alertMessage = await waitFor(() => screen.getByRole('alert'));
    expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.LOGIN_FAILURE);
  });

  it('존재하지 않는 유저 이메일로는 로그인할 수 없다.', async () => {
    const email = 'no@exist.com';
    const password = 'testtest';

    login(email, password);

    const alertMessage = await waitFor(() => screen.getByRole('alert'));
    expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.LOGIN_FAILURE);
  });
});
