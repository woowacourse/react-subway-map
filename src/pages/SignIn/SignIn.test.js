import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '.';

describe('<SignIn />', () => {
  const setup = () => {
    const utils = render(
      <Provider store={store}>
        <Router>
          <SignIn />
        </Router>
      </Provider>
    );
    const { getByTestId, getByPlaceholderText } = utils;
    const button = getByTestId('signin-button');
    const input = {
      email: getByPlaceholderText('✉️ 이메일을 입력해주세요.'),
      password: getByPlaceholderText('🔒 비밀번호를 입력해주세요.'),
    };

    return {
      ...utils,
      button,
      input,
    };
  };

  it('로그인 폼을 입력하지 않고, 로그인을 하면 안내 문구가 나온다.', async () => {
    const { getByText, button, input } = setup();
    const invalidInputs = [
      { email: '', password: '', message: '이메일을 입력해주세요.' },
      { email: '', password: 'test', message: '이메일을 입력해주세요.' },
      { email: 'test', password: '', message: '비밀번호를 입력해주세요.' },
    ];

    for (const { email, password, message } of invalidInputs) {
      fireEvent.input(input.email, { target: { value: email } });
      fireEvent.input(input.password, { target: { value: password } });
      fireEvent.click(button);
      await waitFor(() => getByText(message));
    }
  });

  // TODO: API가 모두 구현되면, 서버에 따른 로그인 가능 여부 테스트
});
