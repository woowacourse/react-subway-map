import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { COLOR, PALETTE } from '../../constants/style';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin-bottom: 2.5rem;
  text-align: center;
`;

export const Name = styled.h3<{ bgColor: string }>`
  padding: 0.5rem 1rem;
  border-bottom: 0.1rem solid ${COLOR.GRAY_300};
`;

export const Line = styled.div<{ bgColor: string }>`
  position: relative;
  width: 100%;
  height: 0.5rem;
  background-color: ${props => props.bgColor};
`;

const StationTransferIcon = css`
  background: linear-gradient(195deg, ${PALETTE.RED} 0%, ${PALETTE.RED} 50%, ${PALETTE.BLUE} 50%, ${PALETTE.BLUE} 100%);
`;

export const StationIcon = styled.div<{ isTransfer: boolean }>`
  width: 0.8rem;
  height: 0.8rem;

  background-color: ${COLOR.WHITE};
  border: 1px solid ${COLOR.BLACK};
  border-radius: 50%;
  position: absolute;
  left: calc(50% - 0.4rem);
  top: -0.1rem;

  ${({ isTransfer }) => isTransfer && StationTransferIcon}
`;

export const StationList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

export const StationListItem = styled.li<{ color: string }>`
  position: relative;
  padding-bottom: 2rem;

  &:nth-of-type(6n) {
    &::after {
      position: absolute;
      right: -0.2rem;
      bottom: 2.25rem;
      content: '➤';
      font-size: 1.5rem;
      font-weight: bold;
      width: 1rem;
      height: 1rem;
      color: ${props => props.color};
    }
  }

  &:nth-of-type(6n + 7) {
    &::after {
      position: absolute;
      left: -0.7rem;
      bottom: 2.25rem;
      content: '➤';
      font-size: 1.5rem;
      font-weight: bold;
      width: 1rem;
      height: 1rem;
      color: ${props => props.color};
    }
  }
`;

export const StationName = styled.h4`
  transform: rotate(-45deg) translateX(2rem) translateY(1rem);
`;

export const TransferLineList = styled.ul`
  padding: 0;
  margin-bottom: 0.5rem;
  font-size: 0.5rem;
  font-weight: bold;
  color: ${COLOR.WHITE};
  height: 2rem;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  transform: rotate(-45deg) translateX(0rem) translateY(1.75rem);
`;

export const TransferLineListItem = styled.li<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 0.15rem 0.3rem;
  margin-right: 0.2rem;
  border-radius: 1rem;
`;
