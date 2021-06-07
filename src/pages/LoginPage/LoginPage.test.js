import React from 'react';
import MESSAGE from '../../constants/message';
import { render, fireEvent, waitFor, screen } from '../../test-utils';
import LoginPage from './LoginPage';

const loginSetUp = ({ email, password }) => {
  const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
  fireEvent.change(emailInput, {
    target: {
      value: email,
    },
  });
  expect(emailInput.value).toBe(email);

  const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');
  fireEvent.change(passwordInput, {
    target: {
      value: password,
    },
  });
  expect(passwordInput.value).toBe(password);

  const loginButton = screen.getByRole('button', { name: '로그인' });

  fireEvent.click(loginButton);
};

describe('로그인', () => {
  beforeEach(() => {
    render(<LoginPage />);
  });
  it('로그인이 성공하면 페이지를 이동한다.', async () => {
    loginSetUp({ email: 'test@test.com', password: '12341234' });

    await waitFor(() => expect(window.location.pathname).toBe('/station'));
  });

  it('이메일이 유효하지 않으면 에러 메시지를 출력한다.', async () => {
    loginSetUp({ email: 'test@test.', password: '12341234' });

    const alertMessage = await waitFor(() => screen.getByRole('alert'));

    expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_EMAIL);
  });

  it('비밀번호가 8자 이하이면 에러 메시지를 출력한다.', async () => {
    loginSetUp({ email: 'test@test.com', password: '1234' });

    const alertMessage = await waitFor(() => screen.getByRole('alert'));

    expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_PASSWORD);
  });
});
