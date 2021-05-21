import { FC, FormHTMLAttributes } from 'react';
import { ChildrenContainer, StyledAuthForm, Title } from './Auth.styles';

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
