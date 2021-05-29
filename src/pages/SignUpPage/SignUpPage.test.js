/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import MESSAGE from '../../constants/message';
import { render, screen, waitFor, fireEvent } from '../../test-utils';
import SignUpPage from './SignUpPage';

const signup = ({ email, password, passwordConfirm, age }) => {
  const emailInput = screen.getByLabelText(/이메일/);
  const ageInput = screen.getByLabelText(/나이/);
  const passwordInput = screen.getByLabelText(/(?=.*비밀번호)(?!.*확인).*/);
  const passwordConfirmInput = screen.getByLabelText(/비밀번호 확인/);

  const signupButton = screen.getByRole('button', {
    name: /회원가입/,
  });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.blur(emailInput);
  fireEvent.change(ageInput, { target: { value: age } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(passwordConfirmInput, { target: { value: passwordConfirm } });

  fireEvent.click(signupButton);
};

describe('회원가입 페이지', () => {
  beforeEach(() => {
    render(<SignUpPage />);
  });

  it('가입되지 않은 이메일로 회원가입 할 수 있다.', async () => {
    const formData = {
      email: 'new@test.com',
      age: 20,
      password: 'testtest',
      passwordConfirm: 'testtest',
    };

    signup(formData);

    const alertMessage = await waitFor(() => screen.getByRole('alert'));
    expect(alertMessage).toHaveTextContent(MESSAGE.SUCCESS.SIGNUP);
  });

  it('존재하는 이메일인 경우 에러 메시지를 확인할 수 있다.', async () => {
    const formData = {
      email: 'test@test.com',
      age: 20,
      password: 'testtest',
      passwordConfirm: 'testtest',
    };

    signup(formData);

    const alertMessage = await waitFor(() => screen.getByText(MESSAGE.ERROR.DUPLICATED_EMAIL));
    expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.DUPLICATED_EMAIL);
  });

  it('비밀번호와 비밀번호 확인이 일치하지 않을 경우 회원가입 할 수 없다.', async () => {
    const formData = {
      email: 'new@test.com',
      age: 20,
      password: 'testtest1',
      passwordConfirm: 'testtest2',
    };

    await waitFor(() => signup(formData));

    const alertMessage = await waitFor(() => screen.getByText(MESSAGE.ERROR.DIFFERENT_PASSWORD));
    expect(alertMessage).toHaveTextContent(MESSAGE.ERROR.DIFFERENT_PASSWORD);
  });
});
