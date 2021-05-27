import PropTypes from 'prop-types';
import React, { ChangeEvent, FC } from 'react';
import { Station } from '../../../types';
import Arrow from '../../@common/Icon/Arrow';
import {
  SectionSelectBoxContainer,
  SectionSelectErrorMessage,
  StationSelectBox,
  StationsSelectContainer,
} from './SectionSelectBox.styles';

export type OnChangeSectionSelectBoxHandler = (
  type: 'upStationId' | 'downStationId'
) => (event: ChangeEvent<HTMLSelectElement>) => void;

export interface Props {
  onChange: OnChangeSectionSelectBoxHandler;
  errorMessage?: string;
  upStationOptions: Station[];
  downStationOptions: Station[];
}

const SectionSelectBox: FC<Props> = ({
  onChange,
  errorMessage,
  upStationOptions,
  downStationOptions,
}) => {
  return (
    <SectionSelectBoxContainer direction="column">
      <StationsSelectContainer alignItems="center" justifyContent="space-between">
        <StationSelectBox onChange={onChange('upStationId')}>
          <option value="">역을 선택하세요</option>
          {upStationOptions.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </StationSelectBox>
        <Arrow />
        <StationSelectBox onChange={onChange('downStationId')}>
          <option value="">역을 선택하세요</option>
          {downStationOptions.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </StationSelectBox>
      </StationsSelectContainer>
      {errorMessage && <SectionSelectErrorMessage>{errorMessage}</SectionSelectErrorMessage>}
    </SectionSelectBoxContainer>
  );
};

SectionSelectBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  upStationOptions: PropTypes.array.isRequired,
  downStationOptions: PropTypes.array.isRequired,
};

export default SectionSelectBox;
