import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { THEME_COLOR } from '../../../constants/appInfo';
import PALETTE from '../../../constants/palette';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'square' | 'round';
  isColored?: boolean;
}

const buttonTypeCSS = {
  round: css`
    border-radius: 50%;
    width: 4.5rem;
    height: 4.5rem;
  `,
  square: css`
    border-radius: 4px;
    padding: 0.625rem 1.25rem;
  `,
};

const coloredCSS = css`
  background-color: ${THEME_COLOR[400]};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button<Props>`
  border: none;
  font-size: 1.125rem;
  background-color: transparent;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ buttonType }) => buttonType && buttonTypeCSS[buttonType]}
  ${({ isColored }) => isColored && coloredCSS}

  &:enabled:hover::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.07);
  }

  &:disabled {
    ${({ isColored }) => isColored && `background-color: ${PALETTE.GRAY[200]};`}
    color: ${PALETTE.GRAY[400]};
    cursor: default;
  }
`;

Button.defaultProps = {
  buttonType: 'square',
  isColored: true,
};

export default Button;
