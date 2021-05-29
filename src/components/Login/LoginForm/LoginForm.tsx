import { FormEvent, VFC } from 'react';
import useLogin from '../../../hooks/useLogin';
import Button from '../../@common/Button/Button.styles';
import Container from '../../@common/Container/Container.styles';
import AuthForm from '../../@mixins/Auth/AuthForm';
import InputWithAlertText from '../../@mixins/InputWithAlertText/InputWithAlertText';
import { SignUpLink } from './LoginForm.styles';

export interface LoginFormProps {}

const LoginForm: VFC<LoginFormProps> = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    login,
    isValidEmail,
    isValidPassword,
  } = useLogin();

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login();
  };

  return (
    <AuthForm title="로그인" onSubmit={handleLogin}>
      <InputWithAlertText
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        placeholder="이메일을 입력해주세요."
        isValid={isValidEmail}
        invalidText="이메일 양식에 맞게 입력해주세요."
      />
      <InputWithAlertText
        type="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="비밀번호를 입력해주세요."
        isValid={isValidPassword}
        invalidText="비밀번호는 6자 이상입니다."
      />
      <Button>로그인</Button>
      <Container>
        아직 회원이 아니신가요? <SignUpLink to="/signup">회원가입</SignUpLink>
      </Container>
    </AuthForm>
  );
};

export default LoginForm;
