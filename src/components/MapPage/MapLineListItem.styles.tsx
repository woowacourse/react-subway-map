import styled from '@emotion/styled';

export const MapLineListItem = styled.div`
  width: 100%;
  padding: 3rem 0;
  &:last-child {
    margin-bottom: 5rem;
  }
`;

export const LineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6rem 0;
`;

export const LineName = styled.div`
  width: fit-content;
  height: fit-content;
  border: 3px solid ${({ color }) => color};
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
`;

export const StationLine = styled.div`
  position: relative;
  width: 4rem;
  height: 0;
  border: 4px solid ${({ color }) => color};
  font-size: 0.9rem;
  &:last-child {
    border-radius: 0 1rem 1rem 0;
  }
`;

export const StationName = styled.div`
  position: absolute;
  width: 5rem;
  bottom: 2.2rem;
  left: 50%;
  transform: translateX(-50%);
  transform: rotate(-45deg);
`;

export const StationDot = styled.div<{ hasTransferLines: boolean }>`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50% 50%;
  border: 2px solid black;
  background-color: white;
  ${({ hasTransferLines }) => (hasTransferLines ? `cursor: pointer;` : '')}
  ${({ hasTransferLines }) =>
    hasTransferLines ? `background-image: url('assets/transfer-station.png'); background-position: center;` : ''}
`;

export const Bubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: -0.2rem;
  top: 1.5rem;
  padding: 0px;
  z-index: 99;
  min-width: 7rem;
  padding: 1rem 1rem 0 1rem;
  background: #ffffff;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  border: #7f7f7f solid 2px;

  &:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 10px 10px;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: -10px;
    left: 20px;
  }

  &:before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 0 11px 11px;
    border-color: #7f7f7f transparent;
    display: block;
    width: 0;
    z-index: 0;
    top: -13px;
    left: 19px;
  }
`;

export const BubbleTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 0.8rem;
`;

export const TransferLineName = styled.div`
  width: fit-content;
  height: fit-content;
  white-space: nowrap;
  border: 3px solid ${({ color }) => color};
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
  font-size: 0.8rem;
`;
