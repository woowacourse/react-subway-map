import styled from 'styled-components';
import Button from '../../components/@common/Button/Button';
import { Palette } from '../../constants/palette';
import { Link } from 'react-router-dom';

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1.5rem 2.5rem 3rem;
`;

export const LoginForm = styled.form`
  width: 100%;

  label {
    margin-bottom: 2rem;
  }
`;

export const LoginErrorMessage = styled.p`
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  color: ${Palette.RED_400};
`;

export const LoginButton = styled(Button)`
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const SignupLink = styled(Link)`
  color: ${Palette.GRAY_400};
`;
