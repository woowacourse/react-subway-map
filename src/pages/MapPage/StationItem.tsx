import { Chip } from '../../components/shared';
import { APIReturnTypeLine } from '../../hooks/useLines';
import { APIReturnTypeStation } from '../../hooks/useStations';
import { StationRail, StationMarker, StationName, IncludedLines } from './StationItem.style';

interface StationItemProps {
  targetStation: APIReturnTypeStation;
  line: APIReturnTypeLine;
  includedLines?: { id: number; name: string; color: string }[];
}

const StationItem = ({ targetStation, line, includedLines }: StationItemProps) => (
  <li key={targetStation.id}>
    <StationRail lineColor={line.color}></StationRail>
    <StationMarker lineColor={line.color} includedLines={includedLines}></StationMarker>
    <StationName>
      {targetStation.name}
      <IncludedLines>
        {includedLines?.map(
          (includedLine) =>
            includedLine.name !== line.name && (
              <Chip size="xs" backgroundColor={includedLine.color} key={includedLine.id}>
                {includedLine.name}
              </Chip>
            )
        )}
      </IncludedLines>
    </StationName>
  </li>
);

export default StationItem;
