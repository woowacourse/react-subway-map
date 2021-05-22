import { Container } from './SignUpForm.styles';
import { Button, ErrorMessage, Header, Input } from '../../atoms';

export interface SignUpFormProps {
  onChangeNameInput: React.ChangeEventHandler<HTMLInputElement>;
  nameValue: string;
  onChangeEmailInput: React.ChangeEventHandler<HTMLInputElement>;
  emailValue: string;
  onChangePasswordInput: React.ChangeEventHandler<HTMLInputElement>;
  passwordValue: string;
  onChangePasswordCheckInput: React.ChangeEventHandler<HTMLInputElement>;
  passwordCheckValue: string;
  isValidName: boolean;
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidPasswordCheck: boolean;
  onSubmitSignUp: React.FormEventHandler<HTMLFormElement>;
}

const SignUpForm = ({
  onChangeNameInput,
  nameValue,
  onChangeEmailInput,
  emailValue,
  onChangePasswordInput,
  passwordValue,
  onChangePasswordCheckInput,
  passwordCheckValue,
  onSubmitSignUp,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidPasswordCheck,
}: SignUpFormProps) => {
  const isValidForm = isValidName && isValidEmail && isValidPassword && isValidPasswordCheck;

  return (
    <Container onSubmit={onSubmitSignUp}>
      <Header>
        <h3>회원가입</h3>
      </Header>
      <Input placeholder="이름" onChange={onChangeNameInput} value={nameValue} />
      {isValidName && <ErrorMessage text={'이름을 입력해주세요'} />}

      <Input type="email" placeholder="이메일" onChange={onChangeEmailInput} value={emailValue} />
      {isValidEmail && <ErrorMessage text={'올바른 이메일 형식을 입력해주세요'} />}

      <Input
        type="password"
        placeholder="비밀번호"
        onChange={onChangePasswordInput}
        value={passwordValue}
      />
      {isValidPassword && <ErrorMessage text={'비밀번호는 6자이상이어야 합니다'} />}

      <Input
        type="password"
        placeholder="비밀번호 확인"
        onChange={onChangePasswordCheckInput}
        value={passwordCheckValue}
      />
      {isValidPasswordCheck && <ErrorMessage text={'비밀번호가 일치하지 않습니다'} />}

      <Button disabled={isValidForm}>확인</Button>
    </Container>
  );
};

export default SignUpForm;
