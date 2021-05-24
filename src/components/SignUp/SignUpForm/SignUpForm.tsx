import { VFC } from 'react';
import Button from '../../@common/Button/Button.styles';
import Input from '../../@common/Input/Input';
import AuthForm from '../../@mixins/Auth/AuthForm';
import useSignUp from '../../../hooks/useSignUp';

const SignUpForm: VFC = () => {
  const {
    form: { email, age, password, passwordForValidation },
    setEmail,
    setAge,
    setPassword,
    setPasswordForValidation,
    handleSignUp,
  } = useSignUp();

  return (
    <AuthForm title="회원가입" onSubmit={handleSignUp}>
      <Input
        value={email}
        onChange={setEmail}
        placeholder="이메일을 입력해주세요."
      />
      <Input
        type="number"
        value={age}
        onChange={setAge}
        placeholder="나이를 입력해주세요."
      />
      <Input
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="비밀번호를 입력해주세요."
      />
      <Input
        type="password"
        value={passwordForValidation}
        onChange={setPasswordForValidation}
        placeholder="비밀번호를 한번 더 입력해주세요."
      />
      <Button>회원가입</Button>
    </AuthForm>
  );
};

export default SignUpForm;
