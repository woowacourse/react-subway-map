import styled from '@emotion/styled';
import { PALETTE } from '../../constants';

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

const TransferInfo = styled.div`
  position: absolute;
  border: 1px solid #000;
`;

const StationName = styled.div<{ isMouseOver: boolean }>`
  font-weight: ${({ isMouseOver }) => isMouseOver && '700'};
  margin: 12px 24px 18px 0;
  transform: rotate(-45deg);
`;

const Circle = styled.div<{ lineColor: string; isTransferStation: boolean }>`
  position: absolute;
  bottom: -12px;
  left: -8px;
  width: ${({ isTransferStation }) => (isTransferStation ? '20px' : '16px')};
  height: ${({ isTransferStation }) => (isTransferStation ? '20px' : '16px')};
  border: 2px solid
    ${({ lineColor, isTransferStation }) => (isTransferStation ? PALETTE.DEFAULT_BLACK : lineColor)};
  background-color: ${PALETTE.DEFAULT_WHITE};
  border-radius: 50%;
`;

export default { Container, Line, LineName, Station, TransferInfo, StationName, Circle };
