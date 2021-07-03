import styled, { css } from 'styled-components';
import PALETTE from '../../../constants/palette';

interface ButtonProps extends React.CSSProperties {
  size: 's' | 'm' | 'l';
}

const buttonSize = {
  s: css`
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  `,
  m: css`
    padding: 0.6rem 1rem;
    font-size: 1rem;
  `,
  l: css`
    padding: 0.6rem 1.2rem;
    font-size: 1.25rem;
  `,
};

const Button = styled.button<ButtonProps>`
  background-color: ${({ backgroundColor }) => backgroundColor ?? PALETTE.WHITE_100};
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.3);
  border-radius: 0.4rem;
  ${({ size }) => buttonSize[size] ?? ''}
  color: ${({ color }) => color ?? PALETTE.BLACK_900};
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  transition: transform 0.2s ease;

  :hover:enabled {
    transform: scaleX(1.01) scaleY(1.05);
    filter: brightness(1.05);
  }

  :focus:enabled {
    filter: brightness(1.05);
  }

  :active:enabled {
    transform: scaleX(1) scaleY(0.95);
  }

  :disabled {
    cursor: not-allowed;
    background-color: ${PALETTE.GRAY_100};
    box-shadow: none;
  }
`;

export default Button;
export type { ButtonProps };
