import PropTypes from 'prop-types';
import React, { ChangeEvent, FC } from 'react';
import { Station } from '../../../types';
import Arrow from '../../@common/Icon/Arrow';
import { StationContainer, StationSelectBox } from './SectionSelectBox.styles';

export type OnChangeSectionSelectBoxHandler = (
  type: 'upStationId' | 'downStationId'
) => (event: ChangeEvent<HTMLSelectElement>) => void;

export interface Props {
  onChange: OnChangeSectionSelectBoxHandler;
  upStationOptions: Station[];
  downStationOptions: Station[];
}

const SectionSelectBox: FC<Props> = ({ onChange, upStationOptions, downStationOptions }) => {
  return (
    <StationContainer alignItems="center" justifyContent="space-between">
      <StationSelectBox onChange={onChange('upStationId')}>
        {upStationOptions.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </StationSelectBox>
      <Arrow />
      <StationSelectBox onChange={onChange('downStationId')}>
        {downStationOptions.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </StationSelectBox>
    </StationContainer>
  );
};

SectionSelectBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  upStationOptions: PropTypes.array.isRequired,
  downStationOptions: PropTypes.array.isRequired,
};

export default SectionSelectBox;
