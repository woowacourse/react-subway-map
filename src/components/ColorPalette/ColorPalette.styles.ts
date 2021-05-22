import styled from 'styled-components';

export const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-flow: dense;
  grid-gap: 4px;
  width: fit-content;
`;

export const Button = styled.button`
  background-color: ${({ color }) => color};
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;
