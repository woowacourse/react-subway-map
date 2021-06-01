import styled from 'styled-components';
import { Color } from '../../types';

export const RouteMapPage = styled.div`
  margin: 2rem 0;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 50%;
  min-width: 320px;
  max-width: 768px;
`;

export const HeaderText = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2rem;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  margin: 2rem 0;

  label {
    flex: 1;
  }

  svg {
    height: 30px;
  }
`;

export const Control = styled.div`
  position: relative;
  padding: 30px 0;
`;

export const Divider = styled.hr`
  height: 1px;
  border: none;
  background-color: ${({ theme }) => theme.color.border.secondary};
`;

export const RouteMap = styled.ul`
  margin: 0;
  padding: 0;
  padding-left: 3rem;
  list-style: none;
`;

interface RouteStationProps {
  color?: Color;
  highlight?: boolean;
}

export const RouteStation = styled.li<RouteStationProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 2em;
  padding-left: 2em;
  border-left: 3px solid ${({ color }) => color};

  &:last-of-type {
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    left: -14px;
    border: 3px solid ${({ theme }) => theme.color.border.black};
    border-radius: 20px;
    background-color: ${({ theme }) => theme.color.bg.white};
    margin-right: 5px;
    animation: ${({ highlight }) => highlight && 'highlight 1.3s ease infinite'};
  }

  @keyframes highlight {
    0% {
      background-color: ${({ theme }) => theme.color.bg.white};
    }
    50% {
      background-color: ${({ theme }) => theme.color.bg.primary.active};
    }
    100% {
      background-color: ${({ theme }) => theme.color.bg.white};
    }
  }
`;

export const LineHeader = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 2rem;
  padding-left: 1rem;
`;

export const LineName = styled.h3`
  font-size: 28px;
  margin: 0;
  margin-left: 1rem;
`;

export const StationName = styled.span`
  font-size: 1.4em;
  line-height: 1em;
`;

export const TransferLineList = styled.div`
  display: flex;
  margin-top: 1em;
  position: relative;
`;

export const Distance = styled.div`
  padding-top: 0.8em;
  font-size: 12px;
`;
