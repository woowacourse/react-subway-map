import styled from 'styled-components';
import { ValidationTextProps } from './ValidationText';

export const StyledAlertText = styled.span<
  Pick<ValidationTextProps, 'isValid'>
>`
  color: ${({ isValid }) => (isValid ? 'green' : 'crimson')};
  font-size: 0.725rem;
  position: absolute;
  padding: 0.125rem;
  bottom: -1.25rem;
`;
