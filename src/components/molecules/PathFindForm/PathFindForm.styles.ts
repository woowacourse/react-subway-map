import styled from '@emotion/styled';
import { FlexCenter } from '../../../styles/css';

const PathFindFormWrapper = styled.form`
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

export { PathFindFormWrapper, SelectWrapper };
