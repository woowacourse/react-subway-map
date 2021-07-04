import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import PALETTE, { Color } from '../../../constants/palette';
import useThemeColor from '../../../hooks/useThemeColor/useThemeColor';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonShape?: 'square' | 'round';
  isColored?: boolean;
}

interface StyledButtonProps extends Props {
  themeColor: Color;
}

const buttonShapeCSS = {
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

const coloredCSS = (themeColor: Color) => css`
  background-color: ${themeColor[400]};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  font-size: 1.125rem;
  background-color: transparent;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ buttonShape }) => buttonShape && buttonShapeCSS[buttonShape]}
  ${({ isColored, themeColor }) => isColored && coloredCSS(themeColor)}

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
    ${({ isColored, themeColor }) => isColored && `background-color: ${themeColor[300]};`}
    color: ${PALETTE.GRAY[400]};
    cursor: default;
  }
`;

export const Button = ({
  children,
  buttonShape = 'square',
  isColored = true,
  ...options
}: PropsWithChildren<Props>): JSX.Element => {
  const themeColor = useThemeColor();

  return (
    <StyledButton
      buttonShape={buttonShape}
      isColored={isColored}
      themeColor={themeColor as Color}
      {...options}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
