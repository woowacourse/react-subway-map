import styled from '@emotion/styled';
import { Line as LineType } from 'types';
import { PALETTE } from '../../constants';

const Container = styled.div`
  width: 100%;
`;

const LineName = styled.div<{ lineColor: LineType['color'] }>`
  width: 110px;
  height: fit-content;
  border-radius: 8px;
  text-align: center;
  padding: 4px;
  margin: auto 0 32px auto;
  color: ${PALETTE.DEFAULT_WHITE};
  background-color: ${({ lineColor }) => lineColor};
`;

const Line = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Station = styled.div<{ lineColor: LineType['color'] }>`
  position: relative;
  word-break: break-all;
  min-width: 80px;
  height: 80px;
  padding-bottom: 12px;
  margin-bottom: 40px;
  border-bottom: 8px solid ${({ lineColor }) => lineColor};
`;

const TransferInfo = styled.div`
  position: absolute;
  border: 1px solid #000;
`;

const StationName = styled.div<{ isMouseOver: boolean }>`
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 24px;
  transform: rotate(-45deg);
  font-weight: ${({ isMouseOver }) => isMouseOver && '700'};
`;

const Circle = styled.div<{ lineColor: LineType['color']; isTransferStation: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -12px;
  border-radius: 50%;
  z-index: 2;
  background-color: ${PALETTE.DEFAULT_WHITE};
  width: ${({ isTransferStation }) => (isTransferStation ? '20px' : '16px')};
  height: ${({ isTransferStation }) => (isTransferStation ? '20px' : '16px')};
  border: 2px solid
    ${({ lineColor, isTransferStation }) => (isTransferStation ? PALETTE.DEFAULT_BLACK : lineColor)};
`;

export default { Container, Line, LineName, Station, TransferInfo, StationName, Circle };
