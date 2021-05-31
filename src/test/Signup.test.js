import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Signup from 'pages/Signup';
import MESSAGE from 'constants/message';
import store from '../redux/store';

const signup = ({ email, password, passwordConfirm, age }) => {
  const emailInput = screen.getByRole('textbox');
  const ageInput = screen.getByRole('spinbutton');
  const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력해주세요/i);
  const passwordConfirmInput = screen.getByPlaceholderText(/비밀번호를 한번 더 입력해주세요/i);

  const kodaButton = screen.getByRole('button', { name: '코다' });

  const signupButton = screen.getByRole('button', {
    name: /회원가입/i,
  });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(ageInput, { target: { value: age } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.change(passwordConfirmInput, { target: { value: passwordConfirm } });

  fireEvent.click(kodaButton);
  fireEvent.click(signupButton);
};

describe('회원가입 페이지', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
  });

  it('가입되지 않은 이메일로 회원가입 할 수 있다.', async () => {
    const data = {
      email: `${Date.now()}@a.a`,
      age: 20,
      password: '1',
      passwordConfirm: '1',
    };

    window.alert = jest.fn();

    signup(data);

    await waitFor(() => expect(window.alert).toBeCalledWith(MESSAGE.SIGNUP.SUCCESS));
  });
});
