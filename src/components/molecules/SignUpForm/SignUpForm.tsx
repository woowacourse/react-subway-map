import React from 'react';
import { StyledForm } from './SignUpForm.styles';
import { Button, ErrorMessage, Input } from '../../atoms';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import { isValidAge, isValidEmail, isValidPassword, isValidPasswordCheck } from '../../../utils';

const SignUpForm = () => {
  const { state, onSubmit } = useFormContext();

  const isValidForm = ({ age, email, password, passwordCheck }: typeof state) => {
    if (age && email && password && passwordCheck) {
      return (
        isValidAge(age.value) &&
        isValidEmail(email.value) &&
        isValidPassword(password.value) &&
        isValidPasswordCheck(password.value, passwordCheck.value)
      );
    }

    return false;
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <Input name="age" type="number" placeholder="나이" ariaLabel="나이" autoFocus />
      {state?.age?.value && !isValidAge(state.age.value) && (
        <ErrorMessage text="나이는 200살 이하여야 합니다." />
      )}
      <Input name="email" type="email" placeholder="이메일" ariaLabel="이메일" />
      {state?.email?.value && !isValidEmail(state.email.value) && (
        <ErrorMessage text="올바른 이메일 형식을 입력해주세요." />
      )}
      <Input name="password" type="password" placeholder="비밀번호" ariaLabel="비밀번호" />
      {state?.password?.value && !isValidPassword(state.password.value) && (
        <ErrorMessage text="비밀번호는 6자이상이어야 합니다." />
      )}

      <Input
        name="passwordCheck"
        type="password"
        placeholder="비밀번호 확인"
        ariaLabel="비밀번호 확인"
      />
      {state?.password?.value &&
        state?.passwordCheck?.value &&
        !isValidPasswordCheck(state.password.value, state.passwordCheck.value) && (
          <ErrorMessage text="비밀번호가 일치하지 않습니다." />
        )}

      <Button disabled={!isValidForm(state)}>확인</Button>
    </StyledForm>
  );
};

export default SignUpForm;
