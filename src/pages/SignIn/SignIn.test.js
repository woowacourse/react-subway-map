import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignIn from '.';
import { ERROR, INPUT_TEXT, TEST } from '../../constants';

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
    const button = getByTestId(TEST.ID.SIGN_IN_BUTTON);
    const input = {
      email: getByPlaceholderText(INPUT_TEXT.EMAIL.PLACE_HOLDER),
      password: getByPlaceholderText(INPUT_TEXT.PASSWORD.PLACE_HOLDER),
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
      { email: '', password: '', message: ERROR.EMAIL.REQUIRED },
      { email: '', password: 'test', message: ERROR.EMAIL.REQUIRED },
      { email: 'test', password: '', message: ERROR.PASSWORD.REQUIRED },
    ];

    for (const { email, password, message } of invalidInputs) {
      fireEvent.input(input.email, { target: { value: email } });
      fireEvent.input(input.password, { target: { value: password } });
      fireEvent.click(button);
      await waitFor(() => getByText(message));
    }
  });
});
