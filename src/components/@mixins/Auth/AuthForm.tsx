import { FC, FormHTMLAttributes } from 'react';
import Title from '../../@common/Title/Title.styles';
import { ChildrenContainer, StyledAuthForm } from './Auth.styles';

export interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  title: string;
}

const AuthForm: FC<AuthFormProps> = ({ children, title, onSubmit }) => {
  return (
    <StyledAuthForm onSubmit={onSubmit}>
      <Title>{title}</Title>
      <ChildrenContainer>{children}</ChildrenContainer>
    </StyledAuthForm>
  );
};

export default AuthForm;
