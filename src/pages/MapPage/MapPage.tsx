import { useContext, useEffect } from 'react';
import { Chip, Heading1 } from '../../components/shared';
import { ERROR_MESSAGE } from '../../constants/messages';
import PALETTE from '../../constants/palette';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import useLines, { APIReturnTypeLine } from '../../hooks/useLines';
import useStations, { APIReturnTypeStation } from '../../hooks/useStations';
import { PageProps } from '../types';

import {
  Container,
  MapBox,
  SubwayMap,
  LineContainer,
  StationList,
  StationRail,
  StationMarker,
  StationName,
  IncludedLines,
  LineName,
} from './MapPage.style';

const STATION_BEFORE_FETCH: APIReturnTypeStation[] = [];
const LINE_BEFORE_FETCH: APIReturnTypeLine[] = [];

const MapPage = ({ setIsLoading }: PageProps) => {
  const [stations, setStations, fetchStations, addStation, deleteStation] =
    useStations(STATION_BEFORE_FETCH);
  const [lines, setLines, fetchLines, fetchLine, addLine, deleteLine] = useLines(LINE_BEFORE_FETCH);

  const themeColor = useContext(ThemeContext)?.themeColor;
  const addMessage = useContext(SnackBarContext)?.addMessage;

  const fetchData = async () => {
    const timer = setTimeout(() => setIsLoading(true), 500);

    try {
      await Promise.all([fetchStations(), fetchLines()]);
    } catch (error) {
      console.error(error);

      addMessage?.(ERROR_MESSAGE.DEFAULT);
      setStations([]);
      setLines([]);
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <MapBox hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
        <Heading1>지하철 전체 보기</Heading1>
        <SubwayMap>
          {lines.map((line) => (
            <LineContainer key={line.id}>
              <Chip size="m" backgroundColor={line.color}>
                {line.name}
              </Chip>
              <StationList>
                {line.stations.map((targetStation) => {
                  const includedLines = stations.find(
                    (station) => station.name === targetStation.name
                  )?.lines;

                  return (
                    <li key={targetStation.id}>
                      <StationRail lineColor={line.color}></StationRail>
                      <StationMarker
                        lineColor={line.color}
                        includedLines={includedLines}
                      ></StationMarker>
                      <StationName>
                        {targetStation.name}
                        <IncludedLines>
                          {includedLines
                            ?.filter((includedLine) => includedLine.name !== line.name)
                            ?.map((line) => (
                              <Chip size="xs" backgroundColor={line.color} key={line.id}>
                                {line.name}
                              </Chip>
                            ))}
                        </IncludedLines>
                      </StationName>
                    </li>
                  );
                })}
              </StationList>
            </LineContainer>
          ))}
        </SubwayMap>
      </MapBox>
    </Container>
  );
};

export default MapPage;
