import { Properties } from 'csstype';
import styled, { css } from 'styled-components';
import PALETTE from '../../../constants/palette';

interface ChipProps extends Omit<Properties, 'translate'> {
  size: 's' | 'm' | 'l';
}

const chipSize = {
  s: css`
    font-size: 0.5rem;
    padding: 0.1rem 0.4rem;
    border-radius: 1rem;
  `,
  m: css`
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    border-radius: 1.5rem;
  `,
  l: css`
    font-size: 1.2rem;
    padding: 0.3rem 0.6rem;
    border-radius: 2rem;
  `,
};

const Chip = styled.span<ChipProps>`
  background-color: ${PALETTE.WHITE};
  color: ${PALETTE.GRAY_600};
  border: 2px solid ${({ borderColor }) => PALETTE[borderColor ?? 'GRAY_200']};
  ${({ size }) => chipSize[size]}
`;

export default Chip;
export type { ChipProps };
