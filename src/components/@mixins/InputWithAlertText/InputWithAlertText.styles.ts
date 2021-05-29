import styled from 'styled-components';
import { AlertTextProps } from '../../@common/AlertText/AlertText';

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const StyledAlertText = styled.span<Pick<AlertTextProps, 'isValid'>>`
  color: ${({ isValid }) => (isValid ? 'green' : 'crimson')};
  font-size: 0.725rem;
  position: absolute;
  padding: 0.125rem;
  bottom: 0.375rem;
`;
