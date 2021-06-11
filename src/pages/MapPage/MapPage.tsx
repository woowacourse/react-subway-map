import { useContext, useEffect } from 'react';
import { Chip, Heading1 } from '../../components/shared';
import { ERROR_MESSAGE } from '../../constants/messages';
import PALETTE from '../../constants/palette';
import { SnackBarContext } from '../../contexts/SnackBarProvider';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import useLines, { APIReturnTypeLine } from '../../hooks/useLines';
import useStations, { APIReturnTypeStation } from '../../hooks/useStations';
import { PageProps } from '../types';

import { Container, MapBox, SubwayMap, LineContainer, StationList } from './MapPage.style';
import StationItem from './StationItem';

const MapPage = ({ setIsLoading }: PageProps) => {
  const [stations, setStations, fetchStations, addStation, deleteStation] = useStations(null);
  const [lines, setLines, fetchLines, fetchLine, addLine, deleteLine] = useLines(null);

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

  if (stations === null || lines === null) {
    return <></>;
  }

  return (
    <Container>
      <MapBox hatColor={themeColor} backgroundColor={PALETTE.WHITE}>
        <Heading1>지하철 전체 보기</Heading1>
        <SubwayMap>
          {lines?.map((line) => (
            <LineContainer key={line.id}>
              <Chip size="m" backgroundColor={line.color}>
                {line.name}
              </Chip>
              <StationList>
                {line.stations.map((targetStation) => {
                  const includedLines = stations?.find(
                    (station) => station.name === targetStation.name
                  )?.lines;

                  return (
                    <StationItem
                      targetStation={targetStation}
                      line={line}
                      includedLines={includedLines}
                    />
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
