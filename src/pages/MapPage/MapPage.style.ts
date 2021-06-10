import styled from 'styled-components';
import { Container as Box } from '../../components/shared/Box/Box.style';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapBox = styled(Box)`
  max-width: 52rem;
`;

const SubwayMap = styled.div`
  width: 85%;
  height: 100%;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
`;

const LineContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 4.5rem;

  & > span {
    position: absolute;
    transform: translate(-2.5rem, 6rem);
    z-index: 10;
  }
`;

const StationList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;

  li {
    margin-top: 6rem;
  }
`;

const LineName = styled.span`
  display: inline-block;
  width: auto;
`;

export { Container, MapBox, SubwayMap, LineContainer, StationList, LineName };
