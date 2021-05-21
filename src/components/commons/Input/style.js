import styled, { css } from 'styled-components';
import { COLOR, SIZE } from '../../../constants';

export const inputSize = {
  [SIZE.MD]: css`
    height: 40px;
    font-size: 16px;
  `,
  [SIZE.LG]: css``,
};

export const Container = styled.div`
  & > label {
    position: relative;
    top: 10px;
    left: 10px;
    background-color: ${COLOR.WHITE};
    color: ${COLOR.GRAY_300};
    font-size: 12px;
  }

  & > input {
    ${({ size }) => inputSize[size]}
    width: 100%;
    padding: 0 8px;
    border: 1px solid ${COLOR.GRAY_300};
    border-radius: 4px;
  }
`;
