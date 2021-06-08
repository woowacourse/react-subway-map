import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { API_INFO } from '../../../constants/api';
import { Palette } from '../../../constants/palette';
import { RootState } from '../../../redux/store';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'square' | 'round';
  isColored?: boolean;
  children: ReactNode;
}

interface StyledButtonProps extends Props {
  themeColor: Palette;
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

const coloredCSS = (themeColor: Palette) => css`
  background-color: ${themeColor};
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
  ${({ buttonType }) => buttonType && buttonTypeCSS[buttonType]}
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
    ${({ isColored, themeColor }) => isColored && `background-color: ${themeColor};`}
    color: ${Palette.GRAY_400};
    cursor: default;
  }
`;

export const Button: FC<Props> = ({
  children,
  buttonType = 'square',
  isColored = true,
  ...options
}) => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);

  return (
    <StyledButton
      buttonType={buttonType}
      isColored={isColored}
      themeColor={API_INFO[apiOwner].themeColor}
      {...options}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
