import { Container } from './LoginForm.styles';
import { Button, Header, Input } from '../../atoms';

interface LoginFormProps {
  onChangeEmailInput: React.ChangeEventHandler<HTMLInputElement>;
  emailValue: string;
  onChangePasswordInput: React.ChangeEventHandler<HTMLInputElement>;
  passwordValue: string;
  onSubmitLogin: React.FormEventHandler<HTMLFormElement>;
}

const LoginForm = ({
  onChangeEmailInput,
  emailValue,
  onChangePasswordInput,
  passwordValue,
  onSubmitLogin,
}: LoginFormProps) => {
  return (
    <Container onSubmit={onSubmitLogin}>
      <Header>
        <h3>로그인</h3>
      </Header>
      <Input type="email" placeholder="이메일" onChange={onChangeEmailInput} value={emailValue} />
      <Input
        type="password"
        placeholder="비밀번호"
        onChange={onChangePasswordInput}
        value={passwordValue}
      />
      <Button>확인</Button>
    </Container>
  );
};

export default LoginForm;
