import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

jest.mock('react-redux');

describe('SignUp', () => {
  it('빈 폼에서 정상적인 가입정보를 입력했을 때, 버튼의 비활성화가 풀린다.', () => {
    const signUp = render(<SignUp />);

    const ageInput = signUp.getByLabelText('나이');
    const emailInput = signUp.getByLabelText('이메일');
    const passwordInput = signUp.getByLabelText('비밀번호');
    const passwordCheckInput = signUp.getByLabelText('비밀번호 확인');
    const submitButton = signUp.getByRole('button', { name: /확인/i });
    expect(submitButton).toBeDisabled();

    fireEvent.change(ageInput, { target: { value: 22 } });
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '111111' } });
    fireEvent.change(passwordCheckInput, { target: { value: '111111' } });

    expect(submitButton).toBeEnabled();
  });
});
