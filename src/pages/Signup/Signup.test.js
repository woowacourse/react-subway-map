import userEvent from '@testing-library/user-event';
import React from 'react';
import { requestSignup } from '../../API/member';
import { LABEL_TEXT } from '../../constants/a11y';
import { customRender } from '../../test-utils';
import Signup from './Signup';

jest.mock('../../API/member');

describe('회원가입 페이지 테스트', () => {
  it('로그인 요청', () => {
    const screen = customRender(<Signup />);

    const $emailInput = screen.getByPlaceholderText(LABEL_TEXT.PLEASE_INPUT_EMAIL);
    const $ageInput = screen.getByPlaceholderText(LABEL_TEXT.PLEASE_INPUT_AGE);
    const $passwordInput = screen.getByPlaceholderText(LABEL_TEXT.PLEASE_INPUT_PASSWORD);
    const $passwordConfirmInput = screen.getByPlaceholderText(
      LABEL_TEXT.PLEASE_INPUT_PASSWORD_CONFIRM
    );
    const $signUpButton = screen.getByRole('button', {
      name: LABEL_TEXT.SIGNUP,
    });

    const PASSWORD = '123456';

    userEvent.type($emailInput, '0307kwon@naver.com');
    userEvent.type($ageInput, '20');
    userEvent.type($passwordInput, PASSWORD);
    userEvent.type($passwordConfirmInput, PASSWORD);

    userEvent.click($signUpButton);

    expect(requestSignup).toBeCalledTimes(1);
  });
});
