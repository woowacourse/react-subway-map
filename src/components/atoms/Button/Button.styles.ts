import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ButtonTheme } from './Button';

const buttonThemeTable = {
  default: css`
    background-color: #4ecfe0;
  `,
  edit: css`
    background-color: #f1f5f9;
  `,
  menu: css`
    background-color: #ffffff;
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
