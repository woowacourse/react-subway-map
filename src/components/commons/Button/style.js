import styled from 'styled-components';

export const Container = styled.div`
  & > button {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    box-shadow: ${({ hasShadow }) => hasShadow && 'var(--shadow-button)'};
    background-color: ${({ backgroundColor }) => backgroundColor};
    font-size: 16px;

    &:disabled {
      color: rgb(187, 187, 187);
      background-color: rgb(238, 238, 238);
      box-shadow: none;
      cursor: default;
    }
  }
`;
