import styled from "styled-components";

import { Flex, Grid } from "../Layout/";

const ColorPickerBlock = styled(Flex)`
  width: 100%;
`;

const ColorBlockGrid = styled(Grid)`
  grid-template-columns: repeat(9, 1fr);
  column-gap: 2px;
  row-gap: 2px;
  margin-right: 10px;
`;

const ColorBlock = styled.div<{ backgroundColor: string }>`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  transition: opacity 0.5s;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }
`;

const ColorPreview = styled.div<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 8px;
`;

export { ColorPickerBlock, ColorBlockGrid, ColorBlock, ColorPreview };
