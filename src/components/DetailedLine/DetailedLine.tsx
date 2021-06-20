import { VFC } from 'react';
import { LineDetail } from '../../types';
import {
  DetailedLineContainer,
  LineColorDot,
  StationList,
  LineName,
  LineNameContainer,
} from './DetailedLine.styles';

interface DetailedLineProps {
  line: LineDetail;
}

const DetailedLine: VFC<DetailedLineProps> = ({ line }) => {
  return (
    <DetailedLineContainer>
      <LineNameContainer>
        <LineColorDot color={line.color} />
        <LineName>{line.name}</LineName>
      </LineNameContainer>
      <StationList>
        {line.stations.map((station) => (
          <li key={station.id}>{station.name}</li>
        ))}
      </StationList>
    </DetailedLineContainer>
  );
};

export default DetailedLine;
