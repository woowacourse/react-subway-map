import React, { useState } from 'react';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input/Input';
import Styled from './SectionModal.styles';
import { ButtonType, Line, Station } from 'types';
import TextButton from 'components/shared/TextButton/TextButton';
import { API_STATUS, END_POINT } from 'constants/api';
import useFetch from 'hooks/useFetch';
import { ALERT_MESSAGE } from 'constants/messages';

interface SectionModalProps {
  targetLine?: Line;
  lines: Line[];
  stations: Station[] | undefined;
  selectTargetLine: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  closeModal: () => void;
  getLine: () => Promise<void>;
}

const SectionModal = ({
  targetLine,
  lines,
  stations = [],
  closeModal,
  selectTargetLine,
  getLine,
}: SectionModalProps) => {
  const lineOptions = lines.map((line) => ({ id: line.id, value: line.name }));
  const stationOptions = stations.map((station) => ({ id: station.id, value: station.name }));

  const { fetchData: addSectionAsync } = useFetch<null>();

  const [upStationId, setUpStationId] = useState<number>();
  const [downStationId, setDownStationId] = useState<number>();
  const [distance, setDistance] = useState<number>();

  const addSection = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newSection = {
      upStationId,
      downStationId,
      distance,
    };

    const res = await addSectionAsync(
      'POST',
      `${END_POINT.LINES}/${targetLine?.id}/sections`,
      newSection,
    );

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_ADD_SECTION);
    } else if (res.status === API_STATUS.FULFILLED) {
      // TODO: form reset
      closeModal();
      await getLine();
    }
  };

  return (
    <Styled.Container onSubmit={addSection}>
      <Dropdown
        labelText="노선 선택"
        defaultOption={targetLine?.name || '노선 선택'}
        options={lineOptions}
        onSelect={selectTargetLine}
      />
      <Styled.StationInputWrapper>
        <Styled.DropdownWrapper>
          <Dropdown
            labelText="상행역"
            defaultOption="상행역"
            options={stationOptions}
            onSelect={(event) => setUpStationId(Number(event.target.value))}
          />
        </Styled.DropdownWrapper>
        <Styled.DropdownWrapper>
          <Dropdown
            labelText="하행역"
            defaultOption="하행역"
            options={stationOptions}
            onSelect={(event) => setDownStationId(Number(event.target.value))}
          />
        </Styled.DropdownWrapper>
      </Styled.StationInputWrapper>
      <Input
        type="number"
        labelText="거리"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setDistance(Number(event.target.value))
        }
      />
      <Styled.ButtonsContainer>
        <TextButton text="확인" styleType={ButtonType.FILLED}></TextButton>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default SectionModal;
