import styled from '@emotion/styled';
import PALETTE from 'constants/palette';

const Container = styled.div`
  margin-top: 60px;
`;

const LineItem = styled.li`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 44px 0;
  align-items: center;
  margin: 48px 64px;
`;

const LineName = styled.div<{ color: string }>`
  display: inline-block;
  width: fit-content;
  background-color: ${PALETTE.DEFAULT_WHITE};
  color: ${PALETTE.DEFAULT_BLACK};
  padding: 8px 12px;
  border: 2px solid ${({ color }) => color};
  border-radius: 24px;
  font-size: 1.25rem;
  transform: translateX(14px);
  z-index: 10;
`;

const StationConnector = styled.div<{ color: string }>`
  width: fit-content;
  background-color: ${({ color }) => color};
  padding: 0 40px;
  border-radius: inherit;
`;

const StationName = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  color: ${PALETTE.DEFAULT_BLACK};
  text-align: center;
  margin-bottom: 12px;
  transform: rotate(-30deg);
  transition: all 0.3s;
`;

const StationDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${PALETTE.DEFAULT_WHITE};
  border: 2px solid ${PALETTE.DEFAULT_BLACK};
  border-radius: 50%;
  transition: all 0.3s;
`;

const StationItem = styled.div<{ isTransfer: boolean; isFocused: boolean; color: string }>`
  display: inline-block;
  position: relative;
  width: fit-content;

  :last-child {
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }

  ${StationDot} {
    transform: ${({ isFocused }) => isFocused && 'scale(1.2)'};
    border: 2px solid ${({ isFocused, color }) => isFocused && color};
    cursor: ${({ isTransfer }) => isTransfer && 'pointer'};
  }

  ${StationName} {
    transform: ${({ isFocused }) => isFocused && 'scale(1.2) rotate(-30deg)'};
    font-weight: ${({ isFocused }) => isFocused && 900};
    color: ${({ isFocused, color }) => isFocused && color};
    cursor: ${({ isTransfer }) => isTransfer && 'pointer'};
  }

  &:hover ${StationDot} {
    transform: ${({ isTransfer }) => isTransfer && 'scale(1.2)'};
    border: 2px solid ${({ color }) => color};
  }

  &:hover ${StationName} {
    transform: ${({ isTransfer }) => isTransfer && 'scale(1.2) rotate(-30deg)'};
    font-weight: 900;
    color: ${({ color }) => color};
  }
`;

export default {
  Container,
  LineItem,
  LineName,
  StationItem,
  StationConnector,
  StationName,
  StationDot,
};
