import { Container } from './SignUpForm.styles';
import { Button, ErrorMessage, Input } from '../../atoms';

export interface SignUpFormProps {
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  onChangeEmail: React.ChangeEventHandler<HTMLInputElement>;
  email: string;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
  password: string;
  onChangePasswordCheck: React.ChangeEventHandler<HTMLInputElement>;
  passwordCheck: string;
  isValidName: boolean;
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidPasswordCheck: boolean;
  onSubmitSignUp: React.FormEventHandler<HTMLFormElement>;
}

const SignUpForm = ({
  onChangeName,
  name,
  onChangeEmail,
  email,
  onChangePassword,
  password,
  onChangePasswordCheck,
  passwordCheck,
  onSubmitSignUp,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidPasswordCheck,
}: SignUpFormProps) => {
  const isValidForm = isValidName && isValidEmail && isValidPassword && isValidPasswordCheck;

  return (
    <Container onSubmit={onSubmitSignUp}>
      <Input placeholder="이름" onChange={onChangeName} value={name} />
      {isValidName && <ErrorMessage text={'이름을 입력해주세요'} />}

      <Input type="email" placeholder="이메일" onChange={onChangeEmail} value={email} />
      {isValidEmail && <ErrorMessage text={'올바른 이메일 형식을 입력해주세요'} />}

      <Input type="password" placeholder="비밀번호" onChange={onChangePassword} value={password} />
      {isValidPassword && <ErrorMessage text={'비밀번호는 6자이상이어야 합니다'} />}

      <Input
        type="password"
        placeholder="비밀번호 확인"
        onChange={onChangePasswordCheck}
        value={passwordCheck}
      />
      {isValidPasswordCheck && <ErrorMessage text={'비밀번호가 일치하지 않습니다'} />}

      <Button disabled={isValidForm}>확인</Button>
    </Container>
  );
};

export default SignUpForm;
