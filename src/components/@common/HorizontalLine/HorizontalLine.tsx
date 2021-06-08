import styled from 'styled-components';
import { Palette } from '../../../constants/palette';

const HorizontalLine = styled.hr`
  margin: 3rem 0 0;
  border: none;
  height: 2px;
  background-color: ${Palette.GRAY_200};
`;

export default HorizontalLine;
