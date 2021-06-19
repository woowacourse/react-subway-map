import React from 'react';

import userEvent from '@testing-library/user-event';
import { fireEvent, waitFor } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import { customRender } from '../../test-utils';

import Signup from './Signup';
import { requestEmailCheck, requestSignup } from '../../api/member';
import { PAGE_INFO, SIGN_UP } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';

jest.mock('../../api/member');

describe('Signup', () => {
  let screen;

  beforeEach(() => {
    screen = customRender(<Signup />);
  });

  it('Signup 페이지를 렌더링한다.', () => {
    expect(screen.container).toHaveTextContent(PAGE_INFO.SIGN_UP.text);
    expect(screen.queryByPlaceholderText(SIGN_UP.EMAIL_PLACEHOLDER)).not.toBeNull();
    expect(screen.queryByPlaceholderText(SIGN_UP.AGE_PLACEHOLDER)).not.toBeNull();
    expect(screen.queryByPlaceholderText(SIGN_UP.PASSWORD_PLACEHOLDER)).not.toBeNull();
    expect(screen.queryByPlaceholderText(SIGN_UP.PASSWORD_CONFIRM_PLACEHOLDER)).not.toBeNull();
  });

  it('이메일 입력창에 이메일 형식이 아닌 값을 입력하면, 오류메시지가 나타난다.', () => {
    const emailInput = screen.queryByPlaceholderText(SIGN_UP.EMAIL_PLACEHOLDER);
    userEvent.type(emailInput, 'test');

    expect(screen.container).toHaveTextContent(ERROR_MESSAGE.INVALID_EMAIL);
  });

  it('이메일 입력창에 이메일 형식의 값이 입력된 경우, 입력창 blur시 중복 이메일인지 확인한다.', async () => {
    const emailInput = screen.queryByPlaceholderText(SIGN_UP.EMAIL_PLACEHOLDER);
    requestEmailCheck.mockImplementation(Promise.resolve());

    act(() => {
      userEvent.type(emailInput, 'test@test.com');
      userEvent.tab();
    });

    await waitFor(() => expect(requestEmailCheck).toBeCalled());
  });

  it(`나이 입력창에 ${SIGN_UP.MIN_AGE}보다 작은 값 입력 시, 오류메시지가 나타난다.`, () => {
    const ageInput = screen.queryByPlaceholderText(SIGN_UP.AGE_PLACEHOLDER);

    userEvent.type(ageInput, String(SIGN_UP.MIN_AGE - 1));

    expect(screen.container).toHaveTextContent(ERROR_MESSAGE.INVALID_RANGE_OF_AGE);
  });

  it(`나이 입력창에 ${SIGN_UP.MAX_AGE}보다 큰 값 입력 시, 오류메시지가 나타난다.`, () => {
    const ageInput = screen.queryByPlaceholderText(SIGN_UP.AGE_PLACEHOLDER);

    userEvent.type(ageInput, String(SIGN_UP.MAX_AGE + 1));

    expect(screen.container).toHaveTextContent(ERROR_MESSAGE.INVALID_RANGE_OF_AGE);
  });

  it(`비밀번호 입력창에 ${SIGN_UP.PASSWORD_MIN_LENGTH}자 보다 짧은 값 입력 시, 오류메시지가 나타난다.`, () => {
    const passwordInput = screen.queryByPlaceholderText(SIGN_UP.PASSWORD_PLACEHOLDER);

    userEvent.type(passwordInput, '1'.repeat(SIGN_UP.PASSWORD_MIN_LENGTH - 1));

    expect(screen.container).toHaveTextContent(ERROR_MESSAGE.INVALID_RANGE_OF_PASSWORD);
  });

  it(`비밀번호 입력창에 ${SIGN_UP.PASSWORD_MAX_LENGTH}자 보다 긴 값을 입력 할 수 없다.`, () => {
    const passwordInput = screen.queryByPlaceholderText(SIGN_UP.PASSWORD_PLACEHOLDER);

    userEvent.type(passwordInput, '1'.repeat(SIGN_UP.PASSWORD_MAX_LENGTH + 1));

    expect(passwordInput.value).toBe('1'.repeat(SIGN_UP.PASSWORD_MAX_LENGTH));
  });

  it('비밀번호 입력창에 숫자, 영어가 아닌 값을 입력하면 오류메시지가 나타난다.', () => {
    const passwordInput = screen.queryByPlaceholderText(SIGN_UP.PASSWORD_PLACEHOLDER);

    userEvent.type(passwordInput, '1234#');

    expect(screen.container).toHaveTextContent(ERROR_MESSAGE.INVALID_PASSWORD);
  });

  it('비밀번호와 비밀번호 확인 입력창의 값이 서로 다르면 오류메시지가 나타난다.', () => {
    const passwordInput = screen.queryByPlaceholderText(SIGN_UP.PASSWORD_PLACEHOLDER);
    const passwordConfirmInput = screen.queryByPlaceholderText(
      SIGN_UP.PASSWORD_CONFIRM_PLACEHOLDER
    );

    userEvent.type(passwordInput, '1234');
    userEvent.type(passwordConfirmInput, '12345');

    expect(screen.container).toHaveTextContent(ERROR_MESSAGE.PASSWORD_CONFIRM_FAILURE);
  });

  /* eslint-disable @typescript-eslint/no-empty-function */
  it('사용자는 회원가입을 할 수 있다.', async () => {
    const signupForm = screen.getByRole('form');
    requestSignup.mockImplementation(async () => ({}));

    const jsdomAlert = window.alert;
    window.alert = () => {};

    act(() => {
      fireEvent.submit(signupForm, {
        target: {
          email: 'test@test.com',
          age: '20',
          password: '123456',
        },
      });
    });

    await waitFor(() => expect(requestSignup).toBeCalled());

    window.alert = jsdomAlert;
  });
});
