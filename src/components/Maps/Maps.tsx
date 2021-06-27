import './Maps.styles';

import { Line, Station } from '../../types';
import {
  Map,
  MapColor,
  MapName,
  StationName,
  Stations,
  StyledMaps,
} from './Maps.styles';

import useLine from '../../hooks/useLine';

const Maps = () => {
  const { lines } = useLine();

  return (
    <div>
      {(lines.data as Line[]).map(({ name, color, stations }, index) => {
        return (
          <StyledMaps key={index}>
            <Map color={color}>
              <MapColor color={color} />
              <MapName color={color}>{name}</MapName>
            </Map>
            {(stations as Station[]).map((station, id) => (
              <Stations color={color} key={id}>
                <StationName>{station.name}</StationName>
              </Stations>
            ))}
          </StyledMaps>
        );
      })}
    </div>
  );
};

export default Maps;
