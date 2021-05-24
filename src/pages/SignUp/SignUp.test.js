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
      passwordConfirm: getByPlaceholderText(
        '🔒 비밀번호를 한번 더 입력해주세요.'
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
      { value: '', message: '이메일을 입력해주세요.' },
      { value: 'test', message: '올바른 이메일 형식을 입력해주세요.' },
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
      { value: '', message: '나이를 입력해주세요.' },
      { value: 'test', message: '숫자만 입력해주세요.' },
      { value: '0', message: '올바른 나이를 입력해주세요.' },
      { value: '100', message: '올바른 나이를 입력해주세요.' },
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
      { value: '', message: '비밀번호를 입력해주세요.' },
      { value: 'test', message: '올바른 비밀번호를 입력해주세요.' },
      { value: 'test123', message: '올바른 비밀번호를 입력해주세요.' },
      { value: 'test'.repeat(6), message: '올바른 비밀번호를 입력해주세요.' },
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
      { value: '', message: '비밀번호를 한번 더 입력해주세요.' },
      { value: 'test123@', message: '비밀번호가 일치하지 않습니다.' },
    ];

    fireEvent.input(input.password, { target: { value: 'test123!' } });

    for (const { value, message } of invalidInputs) {
      fireEvent.input(input.passwordConfirm, { target: { value } });
      fireEvent.blur(input.passwordConfirm);
      await waitFor(() => getByText(message));
    }
  });

  it('모든 올바른 값을 입력하면, 회원가입 버튼이 활성화 된다.', async () => {
    const { button, input } = setup();
    const validInput = {
      email: 'test@test.com',
      age: '24',
      password: 'test123!',
      passwordConfirm: 'test123!',
    };

    expect(button).toHaveAttribute('disabled');

    for (let [key, value] of Object.entries(validInput)) {
      fireEvent.input(input[key], { target: { value } });
    }

    await waitFor(() => expect(button).not.toHaveAttribute('disabled'));
  });
});
