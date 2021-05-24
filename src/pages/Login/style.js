import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
