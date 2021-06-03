import styled from '@emotion/styled';

import { FullVerticalCenterBox } from '../../../styles/shared';

const PathResultWrapper = styled(FullVerticalCenterBox)`
  padding: 3rem 2rem;
`;

const DistanceText = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`;

export { PathResultWrapper, DistanceText };
