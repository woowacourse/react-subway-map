import styled from 'styled-components';
import { COLOR } from '../../../constants';

export const Container = styled.div`
  & > button {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    box-shadow: ${({ hasShadow }) => hasShadow && 'var(--shadow-button)'};
    background-color: ${({ backgroundColor }) => backgroundColor};
    font-size: var(--size-regular);

    &:disabled {
      color: ${COLOR.GRAY_300};
      background-color: ${COLOR.GRAY_100};
      box-shadow: none;
      cursor: default;
    }
  }
`;
