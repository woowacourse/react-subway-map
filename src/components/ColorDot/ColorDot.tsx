import styled from 'styled-components';
import { Color } from '../../types';

interface Props {
  color: Color;
}

const ColorDot = styled.span<Props>`
  display: inline-block;
  background-color: ${({ color }) => color};
  width: 14px;
  height: 14px;
  border-radius: 14px;
`;

export default ColorDot;
