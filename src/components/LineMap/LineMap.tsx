import React, { VFC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Line } from '../../types';
import { LineMapContainer, LineMapName, StationsList } from './LineMap.styles';
import StationPoint from './StationPoint/StationPoint';
import TransferInfo from './StationPoint/TransferInfo/TransferInfo';

interface Props {
  line: Line;
}

const LineMap: VFC<Props> = ({ line }) => {
  const { stations } = useSelector((state: RootState) => state.station);

  const getStationWithTransferInfo = (stationId: number) => {
    const dummyStation = {
      id: -1,
      name: '',
      transfer: [],
    };

    if (stations.length === 0) {
      return dummyStation;
    }

    const target = stations.find(({ id }) => stationId === id);

    if (!target) {
      console.error('해당 id를 가진 station 정보가 없습니다.');
      return dummyStation;
    }

    return target;
  };

  return (
    <LineMapContainer>
      <LineMapName>{`🚇${line.name}`}</LineMapName>
      <StationsList lineColor={line.color}>
        {line.stations.map((station) => {
          const targetStation = getStationWithTransferInfo(station.id);
          return (
            <StationPoint
              key={station.id}
              targetStation={targetStation}
              transferInfo={
                <TransferInfo transferLines={targetStation.transfer} currentLineName={line.name} />
              }
            />
          );
        })}
      </StationsList>
    </LineMapContainer>
  );
};

export default LineMap;
