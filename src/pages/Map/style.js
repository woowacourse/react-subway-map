import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Line = styled.div`
  display: flex;
  align-items: center;
  padding: 4rem 0 2rem;
  width: 100%;
`;

export const LineName = styled.span`
  padding-right: 2rem;
  min-width: 7rem;

  font-weight: 800;
  color: ${(props) => props.color};
`;

export const StationList = styled.ul`
  display: flex;
  width: auto;
  height: 0.8rem;
  background-color: ${(props) => props.color};
`;

export const StationItem = styled.li`
  position: relative;
  width: 3.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0.2rem;
    left: 1.3rem;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: white;
  }
`;

export const StationName = styled.span`
  position: absolute;
  top: -3.3rem;
  right: -2.9rem;
  min-width: 6rem;
  padding: 0.25rem;

  transform: rotate(-45deg);
  font-size: 0.85rem;
  letter-spacing: -0.01rem;
  color: ${COLOR.TEXT.PARAGRAPH};
`;

export const TransferLineBall = styled.span`
  position: absolute;
  top: -1.1rem;
  right: 0.25rem;
  display: inline-block;
  width: 0.75rem;
  height: 0.75rem;

  transform: rotate(-45deg);
  text-align: center;
  vertical-align: middle;
  font-size: 0.6rem;
  color: white;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
