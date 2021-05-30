import React, { Fragment } from 'react';
import { PageTemplate } from '../../components';
import { ROUTE } from '../../constants';
import { useSubwayMap } from '../../hooks';
import {
  SubwayMap,
  Container,
  Name,
  Info,
  Station,
  Section,
  Distance,
  Bar,
} from './style';

const Line = ({ name, color, stations, sections }) => {
  const [firstStation, ...restStations] = stations;

  return (
    <Container>
      <Name>{name}</Name>
      <Info color={color}>
        <Station>{firstStation.name}</Station>
        {restStations.map((station, index) => (
          <Fragment key={station.id}>
            <Section>
              <Distance>{sections[index].distance}km</Distance>
              <Bar></Bar>
            </Section>
            <Station>{station.name}</Station>
          </Fragment>
        ))}
      </Info>
    </Container>
  );
};

const Map = () => {
  const { subwayMap } = useSubwayMap();

  return (
    <>
      {subwayMap.length > 0 && (
        <PageTemplate title={ROUTE.MAP.NAME}>
          <SubwayMap>
            {subwayMap.map(({ id, ...lineInfo }) => (
              <Line key={id} {...lineInfo} />
            ))}
          </SubwayMap>
        </PageTemplate>
      )}
    </>
  );
};

export default Map;
