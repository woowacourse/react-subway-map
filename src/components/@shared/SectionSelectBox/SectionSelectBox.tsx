import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { Station } from '../../../types';
import Arrow from '../../@common/Icon/Arrow';
import { StationContainer, StationSelectBox } from './SectionSelectBox.styles';

interface Props {
  upStations: Station[];
  downStations: Station[];
}

const SectionSelectBox: FC<Props> = ({ upStations, downStations }) => {
  return (
    <StationContainer alignItems="center" justifyContent="space-between">
      <StationSelectBox>
        {upStations.map((station) => (
          <option key={station.id} value={station.name}>
            {station.name}
          </option>
        ))}
      </StationSelectBox>
      <Arrow />
      <StationSelectBox>
        {downStations.map((station) => (
          <option key={station.id} value={station.name}>
            {station.name}
          </option>
        ))}
      </StationSelectBox>
    </StationContainer>
  );
};

SectionSelectBox.propTypes = {
  upStations: PropTypes.array.isRequired,
  downStations: PropTypes.array.isRequired,
};

export default SectionSelectBox;
