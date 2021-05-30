import styled, { css } from 'styled-components';
import { COLOR, SIZE } from '../../../constants';

export const selectorSize = {
  [SIZE.MD]: css`
    height: 40px;
    font-size: var(--size-regular);
  `,
  [SIZE.LG]: css`
    height: 50px;
    font-size: var(--size-medium);
  `,
};

export const Container = styled.div`
  width: 100%;

  & > label {
    position: relative;
    top: 10px;
    left: 10px;
    background-color: ${COLOR.WHITE};
    color: ${COLOR.GRAY_300};
    font-size: var(--size-small);
  }

  & > select {
    ${({ size }) => selectorSize[size]}
    width: 100%;
    padding: 0 8px;
    border: 1px solid ${COLOR.GRAY_500};
    border-radius: 4px;
  }
`;
