import styled from 'styled-components';
import { AlertTextProps } from './AlertText';

export const StyledAlertText = styled.span<Pick<AlertTextProps, 'isValid'>>`
  color: ${({ isValid }) => (isValid ? 'green' : 'crimson')};
  font-size: 0.725rem;
  position: absolute;
  padding: 0.125rem;
`;
