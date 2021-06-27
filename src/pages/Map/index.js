import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import { useMap } from '../../hooks';
import { Section } from '../../components';
import { Line, StationList, LineName, StationItem, StationName, TransferLineBall } from './style';

export const MapPage = () => {
  const { map, status, clearStatus } = useMap();
  const { enqueueSnackbar } = useSnackbar();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status.message) {
      enqueueSnackbar(status.message);
    }
    clearStatus();
  }, [status]);

  return (
    <Section heading="전체보기">
      {map.map((line) => (
        <Line>
          <LineName color={line.color}>{line.name}</LineName>
          <StationList key={line.id} color={line.color}>
            {line.sections.map((section) => (
              <Station key={section.id} station={section} />
            ))}
          </StationList>
        </Line>
      ))}
    </Section>
  );
};

function Station(props) {
  const { station } = props;

  return (
    <>
      <StationItem>
        <StationName>{station.name}</StationName>
        {station.transferLines.map((line) => (
          <TransferLineBall color={line.color}>{line.name[0]}</TransferLineBall>
        ))}
      </StationItem>
    </>
  );
}

Station.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string,
    transferLines: PropTypes.array,
  }).isRequired,
};
