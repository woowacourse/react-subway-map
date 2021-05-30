import React from 'react';
import MESSAGE from '../../constants/message';
import { render, fireEvent, waitFor, screen } from '../../test-utils';
import SignUpPage from './SignUpPage';

const signUpSetUp = ({ email, age, password, passwordConfirm }) => {
  const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
  const ageInput = screen.getByPlaceholderText('나이를 입력해주세요');
  const passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');
  const passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 한 번 더 입력해주세요');
  const signUpButton = screen.getByRole('button', { name: '회원가입' });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(ageInput, { target: { value: age } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(passwordConfirmInput, { target: { value: passwordConfirm } });

  fireEvent.click(signUpButton);
};

describe('회원가입', () => {
  beforeEach(() => {
    render(<SignUpPage />);
  });

  it('회원가입이 성공하면 로그인 페이지로 이동한다.', async () => {
    signUpSetUp({
      email: 'test@test.com',
      age: 27,
      password: '12341234',
      passwordConfirm: '12341234',
    });

    await waitFor(() => screen.getByText(MESSAGE.SUCCESS.SIGN_UP));
    await waitFor(() => expect(window.location.pathname).toBe('/'));
  });

  it('이메일이 유효하지 않으면 에러 메시지를 출력한다.', async () => {
    signUpSetUp({
      email: 'test@test.',
      age: 27,
      password: '12341234',
      passwordConfirm: '12341234',
    });

    const alertMessage = await waitFor(() => screen.getByRole('alert'));
    await waitFor(() => expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_EMAIL));
  });

  it('나이가 1살보다 작으면 에러 메시지를 출력한다.', async () => {
    signUpSetUp({
      email: 'test@test.com',
      age: 0,
      password: '12341234',
      passwordConfirm: '12341234',
    });

    const alertMessage = await waitFor(() => screen.getByRole('alert'));
    await waitFor(() => expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_AGE));
  });

  it('나이가 150살보다 크면 에러 메시지를 출력한다.', async () => {
    signUpSetUp({
      email: 'test@test.com',
      age: 151,
      password: '12341234',
      passwordConfirm: '12341234',
    });

    const alertMessage = await waitFor(() => screen.getByRole('alert'));
    await waitFor(() => expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_AGE));
  });

  it('비밀번호가 8자 이하이면 에러 메시지를 출력한다.', async () => {
    signUpSetUp({
      email: 'test@test.com',
      age: 27,
      password: '1234',
      passwordConfirm: '12341234',
    });

    const alertMessage = await waitFor(() => screen.getByRole('alert'));
    await waitFor(() => expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.INVALID_PASSWORD));
  });

  it('비밀번호와 비밀번호 확인이 일치하지 않으면 에러 메시지를 출력한다.', async () => {
    signUpSetUp({
      email: 'test@test.com',
      age: 27,
      password: '12341234',
      passwordConfirm: '123412341234',
    });

    const alertMessage = await waitFor(() => screen.getByRole('alert'));
    await waitFor(() => expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.DIFFERENT_PASSWORD));
  });
});
