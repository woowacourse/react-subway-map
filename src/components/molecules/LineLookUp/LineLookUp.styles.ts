import styled from '@emotion/styled';

const LineWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 4rem;
`;

const LineName = styled.span<{ color: string }>`
  font-size: 2rem;
  font-weight: bold;
  display: inline-block;
  width: 100%;
  border-bottom: 2px solid #000000;

  position: relative;
  padding: 1rem 2.5rem;
  &::before {
    content: '';
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${({ color }) => color};
    position: absolute;
    left: 0;
  }
`;

const StationListWrapper = styled.ul`
  & > li {
    margin: 2rem auto;
  }
`;

const DistanceText = styled.div`
  font-size: 1.5rem;
  margin-left: 5rem;
  padding: 1rem 2rem;
  &::before {
    content: '거리: ';
  }
  &::after {
    content: ' km';
  }
`;

export { LineWrapper, LineName, StationListWrapper, DistanceText };
