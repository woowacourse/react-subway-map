import React, { MouseEventHandler, useEffect, useRef } from 'react';
import { Select } from '../../components';
import useMap from '../../hooks/useMap';
import useSelect from '../../hooks/useSelect';
import useSelectServer from '../../hooks/useSelectServer';
import * as Styled from './MapPage.styles';

const WHOLE_MAP_ID = -1;

const MapPage = () => {
  const currentStationRef = useRef<HTMLDivElement | null>(null);
  const currentLineRef = useRef<HTMLLIElement>(null);

  const { lineList } = useMap();
  const { server } = useSelectServer();

  const {
    value: selectedLineId,
    setValue: setSelectedLineId,
    onChangeNumber: onChangeSelectedLineId,
  } = useSelect(WHOLE_MAP_ID);

  const getSelectedLine = () => {
    if (selectedLineId === WHOLE_MAP_ID) {
      return lineList;
    }

    return [lineList.find((lineItem) => lineItem.id === selectedLineId) || lineList[0]];
  };

  const handleShowTransferLine: MouseEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    currentStationRef.current = currentTarget;
    currentTarget.focus();

    if (!currentStationRef.current) return;
    if (currentTarget === currentStationRef.current) return;

    currentStationRef.current.blur();
  };

  const handleSetTransferLine = (lineId: number) => {
    setSelectedLineId(lineId);
  };

  useEffect(() => {
    setSelectedLineId(WHOLE_MAP_ID);
  }, [server, setSelectedLineId]);

  return (
    <Styled.MapPage>
      <Styled.Container>
        <Select
          labelText="노선을 선택해주세요."
          value={selectedLineId}
          onChange={onChangeSelectedLineId}
        >
          <>
            <option value={WHOLE_MAP_ID}>전체보기</option>
            {lineList.map((line) => (
              <option key={line.id} value={line.id}>
                {line.name}
              </option>
            ))}
          </>
        </Select>
        <Styled.LineList>
          {getSelectedLine().map((line) => (
            <Styled.LineItem
              ref={currentLineRef}
              key={line.id}
              lineName={line.name}
              lineColor={line.color}
            >
              <Styled.Hr color={line.color} />
              {line.stations.map((station) => (
                <Styled.Station
                  key={station.id}
                  tabIndex={0}
                  onMouseEnter={handleShowTransferLine}
                  distance={station.distance !== 0 ? station.distance : undefined}
                >
                  <Styled.StationName color={line.color}>{station.name}</Styled.StationName>
                  <Styled.TransferLine>
                    {station.transferLines?.map((transferLine) => (
                      <Styled.TransferLineName
                        key={transferLine.id}
                        lineColor={transferLine.color}
                        onClick={() => handleSetTransferLine(transferLine.id)}
                      >
                        {transferLine.name}
                      </Styled.TransferLineName>
                    ))}
                  </Styled.TransferLine>
                </Styled.Station>
              ))}
            </Styled.LineItem>
          ))}
        </Styled.LineList>
      </Styled.Container>
    </Styled.MapPage>
  );
};

export default MapPage;
