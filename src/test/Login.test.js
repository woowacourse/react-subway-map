import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MESSAGE from 'constants/message';
import Login from 'pages/Login';
import store from '../redux/store';

const login = ({ email, password }) => {
  const emailInput = screen.getByRole('textbox');
  const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력해주세요/i);

  const kodaButton = screen.getByRole('button', { name: '코다' });

  const loginButton = screen.getByRole('button', {
    name: /로그인/i,
  });

  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });

  fireEvent.click(kodaButton);
  fireEvent.click(loginButton);
};

describe('로그인 페이지', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  it('가입된 아이디로 로그인할 수 있다.', async () => {
    const data = {
      email: 'yujo@a.a',
      password: 'asd',
    };

    window.alert = jest.fn();

    login(data);

    await waitFor(() => expect(window.alert).toBeCalledWith(MESSAGE.LOGIN.SUCCESS));
  });
});
