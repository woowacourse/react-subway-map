import styled from '@emotion/styled';
import { COLOR } from '../../../constants/style';
import { Link } from 'react-router-dom';

export const SignInForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin-bottom: 2.5rem;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 1.25rem;
`;

export const Message = styled.div`
  width: 100%;
  height: 1rem;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: ${COLOR.RED_400};
`;

export const SignUpLinkWrapper = styled.div`
  width: 100%;
  text-align: center;
  color: ${COLOR.GRAY_700};
`;

export const SignUpLink = styled(Link)`
  color: ${COLOR.MINT_500};

  &:hover {
    color: ${COLOR.BLACK};
  }
`;
