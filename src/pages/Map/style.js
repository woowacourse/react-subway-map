import styled from 'styled-components';

import { COLOR } from '../../constants/style';

export const Map = styled.ul`
  padding: 1rem 0 0;
  box-shadow: 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;

  white-space: nowrap;
  overflow: auto;
`;

export const LineItem = styled.li`
  margin: 5rem 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 35rem;
`;

export const LineName = styled.p`
  display: flex;
  align-items: center;
  margin: 0 1rem;
  padding: 0;
  min-width: 6rem;
  margin-right: 1rem;
  font-size: 1.2rem;
`;

export const StationList = styled.ol`
  display: flex;
`;

export const StationItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: '';
    display: block;
    width: 4rem;
    height: 0.4rem;
    margin: 0 -0.1rem;
    background-color: ${(props) => props.lineColor};
    border: 1px solid ${(props) => props.lineColor};
  }

  &:first-child:before {
    content: '';
    display: none;
  }

  &:last-child {
    content: '';
    margin-right: 1rem;
  }
`;

export const Station = styled.div`
  margin: auto 0;
  width: 1.2rem;
  height: 1.2rem;
  background: ${(props) =>
    props.transferLines
      ? `conic-gradient(${COLOR.GRADIENT.RED} 40%, ${COLOR.GRADIENT.BLUE} 0 70%, ${COLOR.GRADIENT.YELLOW} 0)`
      : '#FFF'};
  border: 0.13rem solid ${(props) => props.lineColor};
  border-radius: 50%;
  z-index: 1;

  &:before {
    content: '${(props) => props.stationName}';
    display: block;
    width: 6rem;
    left: 0;
    font-size: 0.8rem;
    transform: rotate(-30deg);
    margin: -2.2rem 0.5rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
