import styled from 'styled-components';
import { Button } from '../../';
import { COLOR } from '../../../constants';

export const StyledButtonRound = styled(Button)`
  width: 2rem;
  height: 2rem;
  font-weight: 700;
  color: ${COLOR.TEXT_DEFAULT};
  border-radius: 50%;
  background-color: ${COLOR.THEME};
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
`;
