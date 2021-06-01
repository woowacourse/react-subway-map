import { render, screen } from '@testing-library/react';
import SignUpForm from '../components/SignUp/SignUpForm/SignUpForm';
import userEvent from '@testing-library/user-event';

window.alert = jest.fn();

describe('사용자가 회원가입을 할 수 있다.', () => {
  test('사용자가 회원가입을 할 수 있다.', async () => {
    // render(<SignUpForm />);
    // const $emailInput = screen.getByPlaceholderText(
    //   '이메일을 입력해주세요.'
    // ) as HTMLInputElement;
    // const $ageInput = screen.getByPlaceholderText(
    //   '나이를 입력해주세요.'
    // ) as HTMLInputElement;
    // const $passwordInput = screen.getByPlaceholderText(
    //   '비밀번호를 입력해주세요.'
    // ) as HTMLInputElement;
    // const $passwordForValidationInput = screen.getByPlaceholderText(
    //   '비밀번호를 한번 더 입력해주세요.'
    // ) as HTMLInputElement;
    // userEvent.type($emailInput, 'test@test.test');
    // userEvent.type($ageInput, '18');
    // userEvent.type($passwordInput, 'test');
    // userEvent.type($passwordForValidationInput, 'test');
    // const $submitButton = screen.getByRole('button');
    // userEvent.click($submitButton);
    // const alert = await screen.findBy('회원가입에 성공하셨습니다!');
    // const alert = await screen.findByRole('alert');
    // await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
    // await waitFor(() => {
    //   expect(screen.getByText('alert')).toBeInTheDocument();
    // });
  });
});
