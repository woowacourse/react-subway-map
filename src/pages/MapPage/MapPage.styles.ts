import styled from 'styled-components';
import { Color } from '../../types';
import { isBrightColor } from '../../utils/luminance';

interface LineItemProp {
  lineName: string;
  lineColor: Color;
}

interface StationProp {
  distance?: number;
}

export const MapPage = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  margin: 0 auto;
  min-width: 320px;
`;

export const LineList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const LineItem = styled.li<LineItemProp>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 7rem;
  width: fit-content;

  ::before,
  ::after {
    content: ${({ lineName }) => `"${lineName}"`};
    width: fit-content;
    padding: 1rem 2rem;
    background-color: ${({ lineColor }) => lineColor};
    border-radius: 0.5rem;
    color: ${({ lineColor, theme }) =>
      isBrightColor(lineColor) ? theme.color.text.primary : theme.color.text.white};
    font-weight: 500;
  }
`;

export const Hr = styled.hr`
  position: absolute;
  width: 80%;
  border: 5px solid ${({ color }) => color};
  z-index: -1;
`;

export const StationName = styled.span`
  position: relative;
  padding: 0 0.5rem;
  top: -1.8rem;

  ::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 2px solid ${({ theme }) => theme.color.border.dark};
    border-radius: 50%;
    width: 15px;
    height: 15px;
    background-color: ${({ theme }) => theme.color.bg.white};
    top: calc(1.8rem + 4px);
    box-sizing: border-box;
  }
`;

export const TransferLineName = styled.span`
  display: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;

  background-color: ${({ lineColor }: Pick<LineItemProp, 'lineColor'>) => lineColor};
  color: ${({ lineColor, theme }) =>
    isBrightColor(lineColor) ? theme.color.text.primary : theme.color.text.white};

  :hover {
    cursor: pointer;
  }
`;

export const Station = styled.div<StationProp>`
  margin: 0 1.5rem;
  position: relative;
  outline: none;

  ::after {
    position: absolute;
    content: ${({ distance }) => distance && `"거리: ${distance}"`};
    width: max-content;
    transform: translate3d(0, 100%, 0);
  }

  :hover ${TransferLineName} {
    display: inline-block;
  }

  :focus ${TransferLineName} {
    display: inline-block;
  }

  :hover ${StationName}::after {
    background-color: ${({ theme }) => theme.color.bg.primary.default};
  }

  :focus ${StationName}::after {
    background-color: ${({ theme }) => theme.color.bg.primary.default};
  }
`;

export const TransferLine = styled.div`
  position: absolute;
  bottom: 4rem;
  width: max-content;
  left: 50%;
  transform: translateX(-50%);
`;
