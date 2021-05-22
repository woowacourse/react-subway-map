import styled from 'styled-components';
import PALETTE from '../../constants/palette';

const Icon = styled.span`
  color: ${PALETTE.GRAY_500};
  margin-right: 0.5rem;
`;

const Heading1 = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${PALETTE.GRAY_600};
  margin-bottom: 2rem;
`;

export { Icon, Heading1 };
