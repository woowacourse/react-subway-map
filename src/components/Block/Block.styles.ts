import styled from "styled-components";

import { FlexCenter } from "../Layout/";
import { COLOR } from "../../constants";

const BlockBlock = styled(FlexCenter)`
  background-color: ${COLOR.WHITE};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 2.5rem;
`;

export { BlockBlock };
