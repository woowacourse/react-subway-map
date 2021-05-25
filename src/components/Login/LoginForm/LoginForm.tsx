import { VFC } from 'react';
import useLogin from '../../../hooks/useLogin';
import Button from '../../@common/Button/Button.styles';
import Container from '../../@common/Container/Container.styles';
import Input from '../../@common/Input/Input';
import AuthForm from '../../@mixins/Auth/AuthForm';
import { SignUpLink } from './LoginForm.styles';

export interface LoginFormProps {}

const LoginForm: VFC<LoginFormProps> = () => {
  const { email, password, setEmail, setPassword, handleLogin } = useLogin();

  return (
    <AuthForm title="로그인" onSubmit={handleLogin}>
      <Input
        value={email}
        onChange={setEmail}
        placeholder="이메일을 입력해주세요."
      />
      <Input
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="비밀번호를 입력해주세요."
      />
      <Button>로그인</Button>
      <Container>
        아직 회원이 아니신가요? <SignUpLink to="/signup">회원가입</SignUpLink>
      </Container>
    </AuthForm>
  );
};

export default LoginForm;
