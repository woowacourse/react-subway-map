import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

interface ContainerProps {
  isValid: boolean;
  isVisible: boolean;
}

const Container = styled.div<ContainerProps>`
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  color: ${({ isValid }) => (isValid ? PALETTE.GREEN : PALETTE.RED)};
  height: 16px;
  font-size: 0.75rem;
`;

export default { Container };
