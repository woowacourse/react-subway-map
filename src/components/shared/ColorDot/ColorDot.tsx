import { Properties } from 'csstype';
import styled, { css } from 'styled-components';
import PALETTE from '../../../constants/palette';

interface ColorDotProps extends Omit<Properties, 'translate'> {
  size: 's' | 'm' | 'l';
}

const colorDotSize = {
  s: css`
    width: 0.6rem;
    height: 0.6rem;
  `,
  m: css`
    width: 1rem;
    height: 1rem;
  `,
  l: css`
    width: 1.4rem;
    height: 1.4rem;
  `,
};

const ColorDot = styled.div<ColorDotProps>`
  ${({ size }) => colorDotSize[size]}
  border-radius: 50%;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? PALETTE[backgroundColor] : PALETTE.GRAY_200};
`;

export default ColorDot;
export type { ColorDotProps };
