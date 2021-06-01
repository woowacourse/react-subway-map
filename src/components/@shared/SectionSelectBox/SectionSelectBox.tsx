import PropTypes from 'prop-types';
import React, { ChangeEvent, ChangeEventHandler, FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Arrow from '../../@common/Icon/Arrow';
import SelectBox from '../../@common/SelectBox/SelectBox';
import {
  SectionHiddenLabel,
  SectionSelectBoxContainer,
  SectionSelectErrorMessage,
  StationsSelectContainer,
} from './SectionSelectBox.styles';

export type OnChangeSectionSelectBoxHandler = (
  type: 'upStationId' | 'downStationId'
) => (event: ChangeEvent<HTMLSelectElement>) => void;

export interface Props {
  onChangeUpStation: ChangeEventHandler<HTMLSelectElement>;
  onChangeDownStation: ChangeEventHandler<HTMLSelectElement>;
  errorMessage?: string;
}

const SectionSelectBox: FC<Props> = ({ onChangeUpStation, onChangeDownStation, errorMessage }) => {
  const { stations } = useSelector((state: RootState) => state.station);

  return (
    <SectionSelectBoxContainer direction="column">
      <StationsSelectContainer alignItems="center" justifyContent="space-between">
        <SectionHiddenLabel labelText="상행역 선택 콤보박스">
          <SelectBox onChange={onChangeUpStation}>
            <option value="">역을 선택하세요</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectBox>
        </SectionHiddenLabel>
        <Arrow />
        <SectionHiddenLabel labelText="하행역 선택 콤보박스">
          <SelectBox onChange={onChangeDownStation}>
            <option value="">역을 선택하세요</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectBox>
        </SectionHiddenLabel>
      </StationsSelectContainer>
      {errorMessage && <SectionSelectErrorMessage>{errorMessage}</SectionSelectErrorMessage>}
    </SectionSelectBoxContainer>
  );
};

SectionSelectBox.propTypes = {
  onChangeUpStation: PropTypes.func.isRequired,
  onChangeDownStation: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default SectionSelectBox;
