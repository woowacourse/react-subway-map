import styled from 'styled-components';
import { Palette } from '../../constants/palette';

export const LineMapContainer = styled.section`
  background-color: ${Palette.GRAY_200};
  border-radius: 7px;
  padding: 1rem;
`;

export const LineMapName = styled.div`
  font-size: 1.5rem;
  padding: 0 0 1rem;
`;

interface StationListProps {
  lineColor: Palette;
}

export const StationsList = styled.ul<StationListProps>`
  display: flex;
  position: relative;
  border-radius: 7px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2);
  padding: 1.5rem 1rem;
  margin-left: 4rem;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 0.5rem;
    left: 0;
    background-color: ${({ lineColor }) => lineColor};
    top: 1.6rem;
  }
`;

export const StationPoint = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 0.5rem;

  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background-color: white;
    border: 1px solid ${Palette.BLACK_400};
    border-radius: 50%;
    margin-bottom: 0.25rem;
    z-index: 1;
  }
`;
