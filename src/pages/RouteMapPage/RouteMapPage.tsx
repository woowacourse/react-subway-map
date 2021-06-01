import React, { useEffect, useState } from 'react';
import { Button, Card, ColorDot, Select } from '../../components';
import * as Styled from './RouteMapPage.styles';
import useSelect from '../../hooks/useSelect';
import useLine from '../../hooks/useLine';
import { Line, Station } from '../../types';

const RouteMapPage = () => {
  const { list: lineList } = useLine();
  const [highlightStationId, setHighlightStationId] = useState<Station['id']>();

  const {
    valueAsNumber: selectedLineId,
    setValue: setSelectedLineId,
    onChange: onChangeSelectedLineId,
  } = useSelect('');

  const selectedLine = lineList.find((line) => line.id === selectedLineId) || lineList[0];

  const selectLine = (lineId: Line['id'], stationId: Station['id']) => {
    setSelectedLineId(`${lineId}`);
    setHighlightStationId(stationId);
  };

  useEffect(() => {
    if (lineList.length > 0 && !selectedLineId) {
      setSelectedLineId(`${lineList[0].id}`);
    }
  }, [lineList, selectedLineId, setSelectedLineId]);

  return (
    <Styled.RouteMapPage>
      <Styled.Container>
        <Card>
          <Styled.HeaderText>전체 보기</Styled.HeaderText>
          <Styled.SelectWrapper>
            <Select labelText="노선 선택" value={selectedLineId} onChange={onChangeSelectedLineId}>
              {lineList.map((line) => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </Select>
          </Styled.SelectWrapper>
          <Styled.Control>
            <Styled.Divider />
          </Styled.Control>
          <Styled.LineHeader>
            <ColorDot color={selectedLine?.color} />
            <Styled.LineName>{selectedLine?.name}</Styled.LineName>
          </Styled.LineHeader>
          <Styled.RouteMap>
            {selectedLine?.stations.map((station) => (
              <Styled.RouteStation key={station.id} highlight={highlightStationId === station.id}>
                <Styled.StationName>{station.name}</Styled.StationName>
                {station?.distance !== 0 && (
                  <Styled.Distance>다음 역까지 {station.distance}km</Styled.Distance>
                )}
                {station.transferLines && (
                  <Styled.TransferLineList>
                    {station.transferLines?.map((line) => (
                      <Button
                        key={line.id}
                        variant="text"
                        onClick={() => selectLine(line.id, station.id)}
                      >
                        <ColorDot color={line.color} /> {line.name}
                      </Button>
                    ))}
                  </Styled.TransferLineList>
                )}
              </Styled.RouteStation>
            ))}
          </Styled.RouteMap>
        </Card>
      </Styled.Container>
    </Styled.RouteMapPage>
  );
};

export default RouteMapPage;
