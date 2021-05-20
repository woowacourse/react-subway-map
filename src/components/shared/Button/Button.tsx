import styled, { css } from 'styled-components';
import { Properties } from 'csstype';

interface ButtonProps extends Properties {
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
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#ffffff'};
  box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.3);
  border-radius: 0.4rem;
  ${({ size }) => buttonSize[size] ?? ''}
  color: ${({ color }) => color ?? 'black'};
  ${({ width }) => (width ? `width: ${width};` : '')}
  transition: transform 0.2s ease;

  :hover {
    transform: scale(1.05);
    filter: brightness(1.05);
  }

  :focus {
    filter: brightness(1.05);
  }

  :active {
    transform: scale(0.95);
  }
`;

export default Button;
export type { ButtonProps };
