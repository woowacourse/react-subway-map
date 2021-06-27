import styled from 'styled-components';

export const Map = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ color }) => color};
  border-radius: 15px;
  padding: 2px 10px;
`;

export const StyledMaps = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`;

export const MapName = styled.div`
  color: ${({ color }) => color};
`;

export const MapColor = styled.div`
  width: 0.825rem;
  height: 0.825rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 0.5rem;
`;

export const Stations = styled.div`
  position: relative;
  text-align: center;
  padding: 0 1rem;

  &::before {
    content: '';
    position: absolute;
    width: 100%;

    border: 1px solid ${({ color }) => color};
    top: 0.825rem;
    left: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0.625rem;
    height: 0.625rem;
    top: 54%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 2px solid ${({ color }) => color};
    border-radius: 50%;
  }
`;

export const StationName = styled.div`
  transform: translate(50%, -100%) rotate(-30deg);
`;
