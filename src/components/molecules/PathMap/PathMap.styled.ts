import styled from '@emotion/styled';

const PathMapWrapper = styled.div`
  margin-top: 2rem;
`;

const StationWrapper = styled.span`
  padding: 1rem 2rem;
  border: 1px solid black;
  border-radius: 5px;
  position: relative;
  font-size: 1.5rem;
  & + & {
    margin-left: 2rem;
    &::before {
      border: solid black;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 0.5rem;
      transform: rotate(-45deg);
      content: '';
      position: absolute;
      left: -2rem;
      top: 1.3rem;
    }
  }
`;

export { PathMapWrapper, StationWrapper };
