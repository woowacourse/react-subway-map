import styled from "styled-components";

import { FlexCenter } from "../@shared/FlexContainer/FlexContainer";
import { COLOR } from "../../constants/color";

export const BlockBlock = styled(FlexCenter)`
  background-color: ${COLOR.WHITE};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 2.5rem;
`;
