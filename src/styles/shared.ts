import styled from '@emotion/styled';
import { FlexCenter } from './css';

const FlexCenterBox = styled.div`
  ${FlexCenter}
`;

const FullVerticalCenterBox = styled(FlexCenterBox)`
  width: 100%;
  flex-direction: column;

  & > * {
    width: 100%;
  }
`;

const ScrollBox = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

export { FlexCenterBox, FullVerticalCenterBox, ScrollBox };
