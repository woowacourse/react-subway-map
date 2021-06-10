import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLOR } from '../../../constants';
import { ButtonTheme } from './Button';

const buttonThemeTable = {
  default: css`
    background-color: ${COLOR.ButtonColor.DEFAULT};
    border-radius: 30px;
  `,
  edit: css`
    background-color: ${COLOR.ButtonColor.EDIT};
  `,
  menu: css`
    background-color: ${COLOR.ButtonColor.MENU};
  `,
};

const Container = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.6rem 1rem;
  border-radius: 4px;

  ${({ buttonTheme }: { buttonTheme: ButtonTheme }) => buttonThemeTable[buttonTheme]}

  &:hover {
    filter: brightness(0.9);
  }

  &[disabled] {
    cursor: not-allowed;
  }
`;

export { Container };
