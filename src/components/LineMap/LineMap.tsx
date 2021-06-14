import React, { VFC } from 'react';
import { Line } from '../../types';
import { LineMapContainer, LineMapName, StationPoint, StationsList } from './LineMap.styles';

interface Props {
  line: Line;
}

const LineMap: VFC<Props> = ({ line }) => {
  return (
    <LineMapContainer>
      <LineMapName>{`🚇${line.name}`}</LineMapName>
      <StationsList lineColor={line.color}>
        {line.stations.map((station) => (
          <StationPoint key={station.id}>{station.name}</StationPoint>
        ))}
      </StationsList>
    </LineMapContainer>
  );
};

export default LineMap;
