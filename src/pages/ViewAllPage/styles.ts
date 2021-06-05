import styled from '@emotion/styled';
import { Line } from 'types';

const LineNames = styled.div`
  display: flex;
  overflow-x: auto;
  height: 80px;
  gap: 16px;
  padding: 12px;
`;

const LineName = styled.div<{ lineColor: Line['color'] }>`
  display: flex;
  margin: auto 0;
  min-width: fit-content;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 2px;
    margin: auto 8px auto 0;
    background-color: ${({ lineColor }) => lineColor};
  }
`;

const LinesMap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default { LinesMap, LineName, LineNames };
