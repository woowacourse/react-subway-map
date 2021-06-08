import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '.';
import { BUTTON_ID, ERROR, INPUT_TEXT, TEST } from '../../constants';
import { Provider } from 'react-redux';
import store from '../../redux';

describe('<SignUp />', () => {
  const setup = () => {
    const utils = render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    const { getByLabelText, getByPlaceholderText } = utils;
    const button = getByLabelText(BUTTON_ID.SIGN_UP);
    const input = {
      email: getByPlaceholderText(INPUT_TEXT.EMAIL.PLACE_HOLDER),
      age: getByPlaceholderText(INPUT_TEXT.AGE.PLACE_HOLDER),
      password: getByPlaceholderText(INPUT_TEXT.PASSWORD.PLACE_HOLDER),
      passwordConfirm: getByPlaceholderText(
        INPUT_TEXT.PASSWORD_CONFIRM.PLACE_HOLDER
      ),
    };

    return {
      ...utils,
      button,
      input,
    };
  };

  it('이메일에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { getByText, input } = setup();
    const invalidInputs = [
      { value: '', message: ERROR.EMAIL.REQUIRED },
      { value: 'test', message: ERROR.EMAIL.INVALID },
    ];

    for (const { value, message } of invalidInputs) {
      fireEvent.input(input.email, { target: { value } });
      fireEvent.blur(input.email);
      await waitFor(() => getByText(message));
    }
  });

  it('나이에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { getByText, input } = setup();
    const invalidInputs = [
      { value: '', message: ERROR.AGE.REQUIRED },
      { value: 'test', message: ERROR.AGE.INVALID },
      { value: '0', message: ERROR.AGE.INVALID },
      { value: '100', message: ERROR.AGE.INVALID },
    ];

    for (const { value, message } of invalidInputs) {
      fireEvent.input(input.age, { target: { value } });
      fireEvent.blur(input.age);
      await waitFor(() => getByText(message));
    }
  });

  it('비밀번호에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { getByText, input } = setup();
    const invalidInputs = [
      { value: '', message: ERROR.PASSWORD.REQUIRED },
      { value: 'test', message: ERROR.PASSWORD.INVALID },
      { value: 'test123', message: ERROR.PASSWORD.INVALID },
      { value: 'test'.repeat(6), message: ERROR.PASSWORD.INVALID },
    ];

    for (const { value, message } of invalidInputs) {
      fireEvent.input(input.password, { target: { value } });
      fireEvent.blur(input.password);
      await waitFor(() => getByText(message));
    }
  });

  it('비밀번호 확인에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { getByText, input } = setup();
    const invalidInputs = [
      { value: '', message: ERROR.PASSWORD_CONFIRM.REQUIRED },
      { value: 'test123@', message: ERROR.PASSWORD_CONFIRM.INVALID },
    ];

    fireEvent.input(input.password, { target: { value: 'test123!' } });

    for (const { value, message } of invalidInputs) {
      fireEvent.input(input.passwordConfirm, { target: { value } });
      fireEvent.blur(input.passwordConfirm);
      await waitFor(() => getByText(message));
    }
  });
});
