import styled, { css } from 'styled-components';
import { Properties } from 'csstype';

import PALETTE from '../../../constants/palette';

interface ButtonProps extends Properties {
  size: 's' | 'm' | 'l';
}

const buttonSize = {
  s: css`
    width: 2rem;
    height: 2rem;
    font-size: 0.75rem;
  `,
  m: css`
    width: 3rem;
    height: 3rem;
  `,
  l: css`
    width: 5rem;
    height: 5rem;
    font-size: 1.25rem;
  `,
};

const RoundButton = styled.button<ButtonProps>`
  background-color: ${({ backgroundColor }) => backgroundColor ?? PALETTE.WHITE};
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  ${({ size }) => buttonSize[size] ?? ''}
  color: ${({ color }) => color ?? 'black'};
  transition: transform 0.2s ease;

  :hover:enabled,
  :focus:enabled {
    filter: brightness(1.05);
  }

  :active:enabled {
    transform: scale(0.95);
    filter: brightness(0.95);
  }

  :disabled {
    cursor: not-allowed;
    background-color: ${PALETTE.GRAY_100};
    box-shadow: none;
  }
`;

export default RoundButton;
export type { ButtonProps };
