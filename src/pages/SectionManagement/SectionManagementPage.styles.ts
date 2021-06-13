import styled from "styled-components";

import { SIZE } from "../../constants/size";
import { FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";

export const SectionManagementPageBlock = styled(FlexCenter)`
  max-width: ${SIZE.PAGE_CONTAINER_WIDTH};
`;

export const SectionListItemWrapper = styled.div`
  position: relative;
`;

export const Distance = styled.span`
  font-size: 12px;
  position: absolute;
  bottom: -5px;
  left: -28px;
`;
