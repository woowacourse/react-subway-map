import React, { VFC } from 'react';
import { Line } from '../../types';
import { LineMapContainer, LineMapName, StationsList } from './LineMap.styles';
import StationPoint from './StationPoint/StationPoint';

interface Props {
  line: Line;
}

export const LineContext = React.createContext<Line | null>(null);

const LineMap: VFC<Props> = ({ line }) => {
  return (
    <LineMapContainer>
      <LineMapName>{`🚇${line.name}`}</LineMapName>
      <StationsList lineColor={line.color}>
        <LineContext.Provider value={line}>
          {line.stations.map((station) => (
            <StationPoint key={station.id} station={station} />
          ))}
        </LineContext.Provider>
      </StationsList>
    </LineMapContainer>
  );
};

export default LineMap;
