import { Container } from './LoginForm.styles';
import { Button, Input } from '../../atoms';

export interface LoginFormProps {
  onChangeEmail: React.ChangeEventHandler<HTMLInputElement>;
  email: string;
  onChangePassword: React.ChangeEventHandler<HTMLInputElement>;
  password: string;
  onSubmitLogin: React.FormEventHandler<HTMLFormElement>;
}

const LoginForm = ({
  onChangeEmail,
  email,
  onChangePassword,
  password,
  onSubmitLogin,
}: LoginFormProps) => {
  return (
    <Container onSubmit={onSubmitLogin}>
      <Input type="email" placeholder="이메일" onChange={onChangeEmail} value={email} />
      <Input type="password" placeholder="비밀번호" onChange={onChangePassword} value={password} />
      <Button>확인</Button>
    </Container>
  );
};

export default LoginForm;
