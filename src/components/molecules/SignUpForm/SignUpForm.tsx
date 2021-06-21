import { Container } from './SignUpForm.styles';
import { Button, ErrorMessage, Input } from '../../atoms';

export interface SignUpFormProps {
  onChangeAge: React.ChangeEventHandler<HTMLInputElement>;
  age: number;
  onChangeEmail: React.ChangeEventHandler<HTMLInputElement>;
  email: string;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
  password: string;
  onChangePasswordCheck: React.ChangeEventHandler<HTMLInputElement>;
  passwordCheck: string;
  isValidAge: boolean;
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidPasswordCheck: boolean;
  onSubmitSignUp: React.FormEventHandler<HTMLFormElement>;
}

const SignUpForm = ({
  onChangeAge,
  age,
  onChangeEmail,
  email,
  onChangePassword,
  password,
  onChangePasswordCheck,
  passwordCheck,

  onSubmitSignUp,

  isValidAge,
  isValidEmail,
  isValidPassword,
  isValidPasswordCheck,
}: SignUpFormProps) => {
  const isValidForm = isValidAge && isValidEmail && isValidPassword && isValidPasswordCheck;

  return (
    <Container onSubmit={onSubmitSignUp}>
      <Input
        name="age"
        type="number"
        placeholder="나이"
        onChange={onChangeAge}
        value={age === 0 ? '' : age}
        ariaLabel="나이"
        autoFocus
      />
      {!isValidAge && age !== 0 && <ErrorMessage text={'나이는 200살 이하여야 합니다.'} />}

      <Input
        name="email"
        type="email"
        placeholder="이메일"
        onChange={onChangeEmail}
        value={email}
        ariaLabel="이메일"
      />
      {!isValidEmail && email.length !== 0 && (
        <ErrorMessage text={'올바른 이메일 형식을 입력해주세요'} />
      )}

      <Input
        name="password"
        type="password"
        placeholder="비밀번호"
        onChange={onChangePassword}
        value={password}
        ariaLabel="비밀번호"
      />
      {!isValidPassword && password.length !== 0 && (
        <ErrorMessage text={'비밀번호는 6자이상이어야 합니다'} />
      )}

      <Input
        name="password-check"
        type="password"
        placeholder="비밀번호 확인"
        onChange={onChangePasswordCheck}
        value={passwordCheck}
        ariaLabel="비밀번호 확인"
      />
      {!isValidPasswordCheck && <ErrorMessage text={'비밀번호가 일치하지 않습니다'} />}

      <Button disabled={!isValidForm}>확인</Button>
    </Container>
  );
};

export default SignUpForm;
