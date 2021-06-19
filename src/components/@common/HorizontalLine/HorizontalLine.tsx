import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

const HorizontalLine = styled.hr`
  margin: 3rem 0 0;
  border: none;
  height: 2px;
  background-color: ${PALETTE.GRAY[200]};
`;

export default HorizontalLine;
