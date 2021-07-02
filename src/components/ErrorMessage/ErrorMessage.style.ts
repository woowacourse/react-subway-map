import styled from "styled-components";

import { FlexCenter } from "../Layout/FlexContainer/FlexContainer";

import { COLOR } from "../../constants/color";

const ErrorMessageBlock = styled(FlexCenter)`
  color: ${COLOR.RED_500};
`;

export { ErrorMessageBlock };
