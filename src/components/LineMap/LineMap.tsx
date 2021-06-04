import React from 'react';
import { Line, Station } from 'types';
import Styled from './LineMap.styles';

interface Props {
  line: Line;
  mouseOverStationId: Station['id'];
  setMouseOverStationId: (id: number) => void;
}

const LineMap = ({ line, mouseOverStationId, setMouseOverStationId }: Props) => {
  return (
    <Styled.Container>
      <Styled.LineName lineColor={line.color}>{line.name}</Styled.LineName>
      <Styled.Line>
        {line.stations.map((station) => (
          <Styled.Station lineColor={line.color} key={station.id}>
            <Styled.StationName
              isMouseOver={Number(station.id) === mouseOverStationId}
              onMouseOver={() => setMouseOverStationId(station.id)}
            >
              {station.name}
            </Styled.StationName>
            <Styled.Circle
              isTransferStation={station.includedLines.length > 1}
              lineColor={line.color}
            ></Styled.Circle>
          </Styled.Station>
        ))}
      </Styled.Line>
    </Styled.Container>
  );
};

export default LineMap;
