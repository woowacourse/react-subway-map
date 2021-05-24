import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '.';

describe('<SignUp />', () => {
  const setup = () => {
    const utils = render(<SignUp />);
    const { getByTestId, getByPlaceholderText } = utils;
    const button = getByTestId('signup-button');
    const input = {
      email: getByPlaceholderText('✉️ 이메일을 입력해주세요.'),
      age: getByPlaceholderText('👤 나이를 입력해주세요.'),
      password: getByPlaceholderText('🔒 비밀번호를 입력해주세요.'),
      passwordConfirn: getByPlaceholderText(
        '🔒 비밀번호를 한번 더 입력해주세요.'
      ),
    };

    return {
      ...utils,
      button,
      input,
    };
  };

  it('회원가입 폼 UI', () => {
    setup();
  });

  it('이메일에 빈 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { getByText, input } = setup();

    fireEvent.input(input.email, { target: { value: '' } });
    fireEvent.blur(input.email);
    await waitFor(() => getByText('이메일을 입력해주세요.'));
  });

  it('이메일에 유효하지 않은 값을 넣었을 때, 안내 문구가 나온다.', async () => {
    const { getByText, input } = setup();

    fireEvent.input(input.email, { target: { value: 'test' } });
    fireEvent.blur(input.email);
    await waitFor(() => getByText('올바른 이메일 형식을 입력해주세요.'));
  });
});
