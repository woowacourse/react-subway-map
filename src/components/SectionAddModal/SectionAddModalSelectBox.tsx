import React, { ChangeEventHandler, useEffect, useState, VFC } from 'react';
import { useSelector } from 'react-redux';
import { ERROR_MESSAGE } from '../../constants/message';
import { useFormInput } from '../../hooks/@shared/useFormInput/useFormInput';
import { RootState } from '../../redux/store';
import { Line } from '../../types';
import HiddenLabel from '../@common/a11y/HiddenLabel/HiddenLabel';
import Arrow from '../@common/Icon/Arrow';
import SelectBox from '../@common/SelectBox/SelectBox';
import { SectionInput } from '../@shared/SectionSelectBox/SectionSelectBox';
import {
  SectionSelectBoxContainer,
  SectionSelectErrorMessage,
  StationsSelectContainer,
} from '../@shared/SectionSelectBox/SectionSelectBox.styles';

interface Props {
  targetLine: Line;
}

const SectionAddModalSectionSelectBox: VFC<Props> = ({ targetLine }) => {
  const [sectionInfo, setSectionInfo] = useFormInput<SectionInput>({
    upStationId: '',
    downStationId: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { stations } = useSelector((state: RootState) => state.station);

  const isStationInLine = (targetId: number) => {
    return targetLine.stations.find((station) => station.id === targetId) ? true : false;
  };

  const onChangeUpStation: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const upStationId = event.currentTarget.value;

    setSectionInfo({
      data: {
        ...sectionInfo.data,
        upStationId,
      },
    });
  };

  const onChangeDownStation: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const downStationId = event.currentTarget.value;

    setSectionInfo({
      data: {
        ...sectionInfo.data,
        downStationId,
      },
    });
  };

  useEffect(() => {
    const { upStationId, downStationId } = sectionInfo.data;
    setSectionInfo({
      canSubmit: false,
    });

    let numberOfStationAddedInLine = 0;

    if (isStationInLine(Number(upStationId))) {
      numberOfStationAddedInLine++;
    }

    if (isStationInLine(Number(downStationId))) {
      numberOfStationAddedInLine++;
    }

    if (numberOfStationAddedInLine !== 1) {
      setErrorMessage(ERROR_MESSAGE.SHOULD_CONTAIN_ONE_STATION_IN_LINE);
      return;
    }

    if (upStationId === '' || downStationId === '') {
      setErrorMessage(ERROR_MESSAGE.NONE_OF_SELECTED_SECTION);
      return;
    }

    setErrorMessage('');
    setSectionInfo({
      canSubmit: true,
    });
  }, [sectionInfo.data.downStationId, sectionInfo.data.upStationId]);

  return (
    <SectionSelectBoxContainer direction="column">
      <StationsSelectContainer alignItems="center" justifyContent="space-between">
        <HiddenLabel className="section-hidden-label" labelText="상행역 선택 콤보박스">
          <SelectBox onChange={onChangeUpStation}>
            <option value="">역을 선택하세요</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectBox>
        </HiddenLabel>
        <Arrow />
        <HiddenLabel className="section-hidden-label" labelText="하행역 선택 콤보박스">
          <SelectBox onChange={onChangeDownStation}>
            <option value="">역을 선택하세요</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </SelectBox>
        </HiddenLabel>
      </StationsSelectContainer>
      {errorMessage && <SectionSelectErrorMessage>{errorMessage}</SectionSelectErrorMessage>}
    </SectionSelectBoxContainer>
  );
};

export default SectionAddModalSectionSelectBox;
