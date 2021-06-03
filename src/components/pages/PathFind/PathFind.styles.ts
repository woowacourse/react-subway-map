import styled from '@emotion/styled';
import { FlexCenter } from '../../../styles/css';
import { FullVerticalCenterBox } from '../../../styles/shared';

const PathFindForm = styled.form`
  ${FlexCenter};
  width: 100%;
  flex-direction: column;
  position: relative;

  & > * {
    width: 100%;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  & > select {
    width: 100%;
    margin: 1rem;
  }
`;

const PathResultWrapper = styled(FullVerticalCenterBox)`
  padding: 3rem 2rem;
`;

const DistanceText = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
`;

export { SelectWrapper, PathFindForm, PathResultWrapper, DistanceText };
