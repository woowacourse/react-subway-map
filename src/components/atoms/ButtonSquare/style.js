import styled from 'styled-components';
import { Button } from '../../';
import { COLOR } from '../../../constants';

export const StyledButtonSquare = styled(Button)`
  width: 4.25rem;
  height: 2rem;
  border-radius: 0.375;
  color: ${COLOR.TEXT_DEFAULT};
  font-weight: 700;
  background-color: ${COLOR.THEME};
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
`;
