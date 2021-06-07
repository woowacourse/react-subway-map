import styled from 'styled-components';
import { Color } from '../../types';

interface ColorDotIProps {
  color: Color;
}

export const ColorDot = styled.span<ColorDotIProps>`
  display: inline-block;
  background-color: ${({ color }) => color};
  width: 14px;
  height: 14px;
  border-radius: 14px;
`;
