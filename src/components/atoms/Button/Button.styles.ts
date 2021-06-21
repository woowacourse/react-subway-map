import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLOR } from '../../../constants';

export type ButtonTheme = 'default' | 'edit' | 'menu' | 'colorPick';

const buttonThemeTable = {
  default: css`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    background-color: ${COLOR.ButtonColor.DEFAULT};
    border-radius: 30px;
  `,
  edit: css`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    background-color: ${COLOR.ButtonColor.EDIT};
  `,
  menu: css`
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    background-color: ${COLOR.ButtonColor.MENU};
  `,
  colorPick: css`
    width: 30px;
    height: 30px;

    && {
      margin-right: 4px;
    }

    &:focus {
      border: 5px solid #333;
      border-radius: 4px;
    }
  `,
};

interface StyledButtonProps {
  buttonTheme: ButtonTheme;
  bgColor?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  ${({ buttonTheme }) => buttonThemeTable[buttonTheme]}
  background-color: ${({ bgColor }) => bgColor};

  &:hover {
    filter: brightness(0.9);
  }

  &[disabled] {
    cursor: not-allowed;
  }
`;

export { StyledButton };
