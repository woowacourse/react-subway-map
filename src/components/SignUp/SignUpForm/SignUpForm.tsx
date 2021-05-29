import { FormEvent, VFC } from 'react';
import Button from '../../@common/Button/Button.styles';
import Input from '../../@common/Input/Input';
import AuthForm from '../../@mixins/Auth/AuthForm';
import AlertText from '../../@common/AlertText/AlertText';
import useSignUp from '../../../hooks/useSignUp';
import { InputContainer } from '../../@mixins/Auth/Auth.styles';

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
    isFormValid,
    isValidEmail,
    isValidAge,
    isValidPassword,
    isValidPasswordForValidation,
  } = useSignUp();

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signUp();
  };

  return (
    <AuthForm title="회원가입" onSubmit={handleSignUp}>
      <InputContainer>
        <Input
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          placeholder="이메일을 입력해주세요."
        />
        {!!email && (
          <AlertText
            isValid={isValidEmail}
            invalidText="이메일 양식에 맞게 입력해주세요."
            validText="올바른 이메일입니다."
          />
        )}
      </InputContainer>
      <InputContainer>
        <Input
          type="number"
          value={age}
          min={1}
          onChange={({ target: { valueAsNumber } }) => setAge(valueAsNumber)}
          placeholder="나이를 입력해주세요."
        />

        {!!age && (
          <AlertText
            isValid={isValidAge}
            validText="올바른 나이입니다."
            invalidText=" 1세 이상만 가입할 수 있습니다."
          />
        )}
      </InputContainer>
      <InputContainer>
        <Input
          type="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          placeholder="비밀번호를 입력해주세요."
        />
        {!!password && (
          <AlertText
            isValid={isValidPassword}
            validText="올바른 비밀번호입니다."
            invalidText="6자 이상의 비밀번호를 입력해주세요."
          />
        )}
      </InputContainer>
      <InputContainer>
        <Input
          type="password"
          value={passwordForValidation}
          onChange={({ target: { value } }) => setPasswordForValidation(value)}
          placeholder="비밀번호를 한번 더 입력해주세요."
        />
        {!!passwordForValidation && (
          <AlertText
            isValid={isValidPasswordForValidation}
            validText="비밀번호와 동일합니다."
            invalidText="비밀번호와 같지 않습니다."
          />
        )}
      </InputContainer>

      <Button disabled={!isFormValid}>회원가입</Button>
    </AuthForm>
  );
};

export default SignUpForm;
