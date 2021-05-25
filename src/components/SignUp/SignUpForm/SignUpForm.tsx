import { FormEvent, VFC } from 'react';
import Button from '../../@common/Button/Button.styles';
import Input from '../../@common/Input/Input';
import AuthForm from '../../@mixins/Auth/AuthForm';
import useSignUp from '../../../hooks/useSignUp';

const SignUpForm: VFC = () => {
  const {
    email,
    age,
    password,
    passwordForValidation,
    setEmail,
    setAge,
    setPassword,
    setPasswordForValidation,
    signUp,
  } = useSignUp();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signUp();
  };

  return (
    <AuthForm title="회원가입" onSubmit={handleSignUp}>
      <Input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        placeholder="이메일을 입력해주세요."
      />
      <Input
        type="number"
        value={age}
        onChange={({ target: { valueAsNumber } }) => setAge(valueAsNumber)}
        placeholder="나이를 입력해주세요."
      />
      <Input
        type="password"
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="비밀번호를 입력해주세요."
      />
      <Input
        type="password"
        value={passwordForValidation}
        onChange={({ target: { value } }) => setPasswordForValidation(value)}
        placeholder="비밀번호를 한번 더 입력해주세요."
      />
      <Button>회원가입</Button>
    </AuthForm>
  );
};

export default SignUpForm;
