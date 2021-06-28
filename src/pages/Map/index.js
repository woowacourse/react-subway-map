import React from 'react';

import { Section } from '../../components';
import useMap from '../../hooks/useMap';
import { LineItem, LineName, Map, StationItem, StationList, StationName } from './style';

export const MapPage = () => {
  const { map } = useMap();

  return (
    <Section heading="전체 보기">
      <Map>
        {map.map((line) => (
          <LineItem key={line.id}>
            <LineName>{line.name}</LineName>
            <StationList>
              {line.sections.map((station) => (
                <StationItem key={station.id} lineColor={line.color}>
                  <StationName
                    stationName={station.name}
                    lineColor={line.color}
                    transferLines={!!station.transferLines.length}
                  />
                </StationItem>
              ))}
            </StationList>
          </LineItem>
        ))}
      </Map>
    </Section>
  );
};
