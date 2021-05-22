import styled from 'styled-components';
import { Button } from '../../';
import { COLOR } from '../../../constants';

export const StyledButtonSquare = styled(Button)`
  width: 4.5rem;
  height: 2.5rem;
  border-radius: 0.375;
  color: ${COLOR.TEXT_DEFAULT};
  font-weight: 700;
  background-color: ${COLOR.THEME};
  border-radius: 0.25rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
  letter-spacing: 0.05rem;

  &:active {
    background-color: ${COLOR.THEME_STRONG};
  }
  &:disabled {
    background-color: ${COLOR.THEME_LIGHT};
  }
`;
