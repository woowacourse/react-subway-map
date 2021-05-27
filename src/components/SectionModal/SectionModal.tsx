import React, { useState } from 'react';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Input from 'components/shared/Input/Input';
import Styled from './SectionModal.styles';
import { ButtonType, Line, Station } from 'types';
import TextButton from 'components/shared/TextButton/TextButton';
import { API_STATUS } from 'constants/api';
import { ALERT_MESSAGE } from 'constants/messages';
import { requestAddSection } from 'request/line';
import { useAppSelector } from 'modules/hooks';

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
  const lineOptions = lines.map((line) => ({ id: line.id, value: line.name }));
  const stationOptions = stations.map((station) => ({ id: station.id, value: station.name }));

  const [upStationId, setUpStationId] = useState<number>();
  const [downStationId, setDownStationId] = useState<number>();
  const [distance, setDistance] = useState<number>();

  const BASE_URL = useAppSelector((state) => state.serverSlice.server);

  const addSection = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!targetLine) return;
    if (!BASE_URL) return;

    const newSection = {
      upStationId,
      downStationId,
      distance,
    };

    const res = await requestAddSection(BASE_URL, targetLine?.id, newSection);

    if (res.status === API_STATUS.REJECTED) {
      alert(ALERT_MESSAGE.FAIL_TO_ADD_SECTION);
    } else if (res.status === API_STATUS.FULFILLED) {
      // TODO: form reset
      closeModal();
      await getLine(targetLine.id);
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
        extraArgs={{ min: '1' }}
      />
      <Styled.ButtonsContainer>
        <TextButton text="확인" styleType={ButtonType.YELLOW}></TextButton>
      </Styled.ButtonsContainer>
    </Styled.Container>
  );
};

export default SectionModal;
