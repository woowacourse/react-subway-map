import React from 'react';
import { Line } from 'types';
import Styled from './LineMap.styles';

interface Props {
  line: Line;
}

const LineMap = ({ line }: Props) => {
  return (
    <Styled.Container>
      <Styled.LineName lineColor={line.color}>{line.name}</Styled.LineName>
      <Styled.Line>
        {line.stations.map((station) => (
          <Styled.Station lineColor={line.color} key={station.id}>
            <Styled.StationName>{station.name}</Styled.StationName>
            <Styled.Circle lineColor={line.color}></Styled.Circle>
          </Styled.Station>
        ))}
      </Styled.Line>
    </Styled.Container>
  );
};

export default LineMap;
