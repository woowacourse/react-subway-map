import { Properties } from 'csstype';
import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

const Heading1 = styled.h1<Properties>`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${PALETTE.GRAY_600};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? '1rem'};
`;

export default Heading1;
