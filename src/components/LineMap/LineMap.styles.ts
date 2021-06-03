import styled from '@emotion/styled';

const Container = styled.div``;

const LineName = styled.div<{ lineColor: string }>`
  color: ${({ lineColor }) => lineColor};
  font-size: 1.75rem;
  margin-right: 24px;
  font-weight: 500;
`;

const Line = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 24px;
`;

const Station = styled.div<{ lineColor: string }>`
  position: relative;
  border-bottom: 8px solid ${({ lineColor }) => lineColor};
  word-break: break-all;
  min-width: 80px;
  padding-bottom: 12px;

  &:last-child {
    border-bottom: 8px solid transparent;
  }
`;

const StationName = styled.div`
  margin: 12px 24px 18px 0;
  transform: rotate(-45deg);
`;

const Circle = styled.div<{ lineColor: string }>`
  position: absolute;
  bottom: -12px;
  left: -8px;
  width: 16px;
  height: 16px;
  background-color: ${({ lineColor }) => lineColor};
  border-radius: 50%;
`;

export default { Container, Line, LineName, Station, StationName, Circle };
