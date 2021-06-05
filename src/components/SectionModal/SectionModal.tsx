import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input/Input';
import TextButton from 'components/shared/TextButton/TextButton';
import { ButtonType, Line, Station } from 'types';
import { API_STATUS, END_POINT } from 'constants/api';
import { ALERT_MESSAGE } from 'constants/messages';
import useFetch from 'hooks/useFetch';
import Styled from './SectionModal.styles';

interface Props {
  targetLine?: Line;
  lines: Line[];
  stations: Station[] | undefined;
  selectTargetLine: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  closeModal: () => void;
  getLine: (targetLineId: Line['id']) => Promise<void>;
}

const SectionModal = ({
  targetLine,
  lines,
  stations = [],
  closeModal,
  selectTargetLine,
  getLine,
}: Props) => {
  const [upStationId, setUpStationId] = useState<string>('');
  const [downStationId, setDownStationId] = useState<string>('');
  const [distance, setDistance] = useState<string>('');

  const [addSectionAsync] = useFetch('POST');

  const { enqueueSnackbar } = useSnackbar();

  const lineOptions = lines.map((line) => ({ id: line.id, value: line.name }));
  const stationOptions = stations.map((station) => ({ id: station.id, value: station.name }));

  const addSection = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!targetLine) return;

    const newSection = {
      upStationId,
      downStationId,
      distance,
    };

    const res = await addSectionAsync(`${END_POINT.LINES}/${targetLine?.id}/sections`, newSection);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_ADD_SECTION);
      resetForm();
      closeModal();

      await getLine(targetLine.id);
    }
  };

  const resetForm = () => {
    setUpStationId('');
    setDownStationId('');
    setDistance('');
  };

  return (
    <Styled.Container onSubmit={addSection}>
      <Dropdown
        labelText="노선 선택"
        defaultOption={targetLine?.name || '노선 선택'}
        options={lineOptions}
        value={targetLine?.id || ''}
        onSelect={selectTargetLine}
      />
      <Styled.StationInputWrapper>
        <Styled.DropdownWrapper>
          <Dropdown
            labelText="상행역"
            defaultOption="상행역"
            options={stationOptions}
            value={upStationId}
            onSelect={(event) => setUpStationId(event.target.value)}
          />
        </Styled.DropdownWrapper>
        <Styled.DropdownWrapper>
          <Dropdown
            labelText="하행역"
            defaultOption="하행역"
            options={stationOptions}
            value={downStationId}
            onSelect={(event) => setDownStationId(event.target.value)}
          />
        </Styled.DropdownWrapper>
      </Styled.StationInputWrapper>
      <Input
        type="number"
        labelText="거리"
        value={distance}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDistance(event.target.value)}
        extraArgs={{ min: '1', max: Number.MAX_SAFE_INTEGER.toString() }}
      />
      <Styled.ButtonsContainer>
        <TextButton text="확인" styleType={ButtonType.YELLOW}></TextButton>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default SectionModal;
