import { StyledForm } from './LoginForm.styles';
import { Button, ErrorMessage, Input } from '../../atoms';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import { isValidEmail, isValidPassword } from '../../../utils';

const LoginForm = () => {
  const { state, onSubmit } = useFormContext();

  const isValidForm = ({ email, password }: typeof state) => {
    if (email && password) {
      return isValidEmail(email.value) && isValidPassword(password.value);
    }

    return false;
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <Input name="email" type="email" placeholder="이메일" ariaLabel="이메일" required autoFocus />
      {state?.email?.value && !isValidEmail(state.email.value) && (
        <ErrorMessage text="올바른 이메일 형식을 입력해주세요." />
      )}
      <Input name="password" type="password" placeholder="비밀번호" ariaLabel="비밀번호" required />
      {state?.password?.value && !isValidPassword(state.password.value) && (
        <ErrorMessage text="비밀번호는 6자이상이어야 합니다." />
      )}
      <Button disabled={!isValidForm(state)}>확인</Button>
    </StyledForm>
  );
};

export default LoginForm;
