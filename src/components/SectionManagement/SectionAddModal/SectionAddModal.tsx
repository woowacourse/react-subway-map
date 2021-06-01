import { FormEvent, Suspense, VFC } from 'react';
import { SERVICE } from '../../../constants/service';
import { INVALID_VALUE } from '../../../constants/validate';
import useLine from '../../../hooks/useLine';
import useSection from '../../../hooks/useSection';
import { Line } from '../../../types';
import Button from '../../@common/Button/Button.styles';
import Container from '../../@common/Container/Container.styles';
import Modal from '../../@common/Modal/Modal';
import Title from '../../@common/Title/Title.styles';
import InputWithAlertText from '../../@mixins/InputWithAlertText/InputWithAlertText';
import {
  SectionSelectBox,
  ControlContainer,
  CancelButton,
} from './SectionAddModal.styles';

export interface SectionAddModalProps {
  closeModal: () => void;
}

const SectionAddModal: VFC<SectionAddModalProps> = ({ closeModal }) => {
  const {
    distance,
    upStationId,
    downStationId,
    setDistance,
    setUpStationId,
    setDownStationId,
    currentLineId,
    setCurrentLineId,
    addSection,
    isValidForm,
    isSelectedLine,
    isSelectedUpStation,
    availableUpStations,
    availableDownStations,
    selectedSectionDistance,
    isValidDistance,
  } = useSection();
  const { lines } = useLine();

  const onAddSection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addSection();

    closeModal();
  };

  return (
    <Modal size="medium" closeModal={closeModal}>
      <Title>구간 추가</Title>
      <form onSubmit={onAddSection} style={{ width: '100%' }}>
        <SectionSelectBox
          placeholder="노선 선택"
          value={currentLineId}
          defaultValue={INVALID_VALUE}
          onChange={({ target }) => setCurrentLineId(Number(target.value))}
        >
          <Suspense fallback={true}>
            {(lines.data as Line[]).map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Suspense>
        </SectionSelectBox>

        <Container>
          <SectionSelectBox
            placeholder="상행역"
            value={upStationId}
            defaultValue={INVALID_VALUE}
            onChange={({ target }) => setUpStationId(Number(target.value))}
            disabled={!isSelectedLine}
          >
            <Suspense fallback={true}>
              {availableUpStations.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Suspense>
          </SectionSelectBox>
          <SectionSelectBox
            placeholder="하행역"
            value={downStationId}
            defaultValue={INVALID_VALUE}
            onChange={({ target }) => setDownStationId(Number(target.value))}
            disabled={!isSelectedUpStation}
          >
            <Suspense fallback={true}>
              {availableDownStations.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Suspense>
          </SectionSelectBox>
        </Container>

        <InputWithAlertText
          type="number"
          min={SERVICE.MIN_DISTANCE - 1}
          max={selectedSectionDistance - 1}
          placeholder={
            isSelectedUpStation
              ? `거리 (${selectedSectionDistance}까지)`
              : '거리'
          }
          value={distance}
          onChange={({ target }) => setDistance(target.valueAsNumber)}
          isValid={isValidDistance}
          disabled={!selectedSectionDistance}
        />

        <ControlContainer>
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <Button disabled={!isValidForm}>확인</Button>
        </ControlContainer>
      </form>
    </Modal>
  );
};

export default SectionAddModal;
