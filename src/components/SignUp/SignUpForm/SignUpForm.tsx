import { VFC } from 'react';
import Button from '../../@common/Button/Button.styles';
import Input from '../../@common/Input/Input';
import AuthForm from '../../@mixins/Auth/AuthForm';

export interface SignUpFormProps {}

const SignUpForm: VFC<SignUpFormProps> = () => {
  return (
    <AuthForm title="회원가입">
      <Input placeholder="이메일을 입력해주세요." />
      <Input placeholder="나이를 입력해주세요." />
      <Input placeholder="비밀번호를 입력해주세요." />
      <Input placeholder="비밀번호를 한번 더 입력해주세요." />
      <Button>회원가입</Button>
    </AuthForm>
  );
};

export default SignUpForm;
