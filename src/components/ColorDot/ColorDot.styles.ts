import styled from 'styled-components';
import { Color } from '../../types';

interface ColorDotProps {
  color: Color;
}

export const ColorDot = styled.span<ColorDotProps>`
  display: inline-block;
  background-color: ${({ color }) => color};
  width: 14px;
  height: 14px;
  border-radius: 14px;
`;
