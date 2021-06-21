import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { COLOR } from '../../constants';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Anchor = styled(Link)`
  font-size: 0.9rem;
  color: ${COLOR.TEXT.DEFAULT};

  &:hover {
    color: ${COLOR.THEME_STRONG};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Message = styled.p`
  margin: -0.5rem 0 0;
  padding: 0 0.5rem;

  font-size: 0.8rem;
  color: ${COLOR.ERROR};
`;
