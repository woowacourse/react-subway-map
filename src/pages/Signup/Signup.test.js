import userEvent from '@testing-library/user-event';
import React from 'react';
import { requestSignup } from '../../api/member';
import { customRender } from '../../test-utils';
import Signup from './Signup';

jest.mock('../../api/member');

describe('회원가입 페이지 테스트', () => {
  it('로그인 요청', () => {
    const screen = customRender(<Signup />);

    const $emailInput = screen.getByPlaceholderText('이메일을 입력해주세요.');
    const $ageInput = screen.getByPlaceholderText('나이를 입력해주세요.');
    const $passwordInput = screen.getByPlaceholderText('비밀번호를 입력해주세요.');
    const $passwordConfirmInput = screen.getByPlaceholderText('비밀번호를 한번 더 입력해주세요.');
    const $signUpButton = screen.getByRole('button', {
      name: '회원가입',
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
