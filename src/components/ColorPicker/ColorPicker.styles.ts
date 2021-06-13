import styled from "styled-components";

import { Flex } from "../@shared/FlexContainer/FlexContainer";
import { Grid } from "../@shared/GridContainer/GridContainer";

export const ColorPickerBlock = styled(Flex)`
  width: 100%;
`;

export const ColorBlockGrid = styled(Grid)`
  grid-template-columns: repeat(9, 1fr);
  column-gap: 2px;
  row-gap: 2px;
  margin-right: 10px;
`;

export const ColorBlock = styled.div<{ backgroundColor: string }>`
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

export const ColorPreview = styled.div<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 8px;
`;
