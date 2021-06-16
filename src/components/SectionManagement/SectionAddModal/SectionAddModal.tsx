import { FormEvent, Suspense, VFC } from 'react';
import { SERVICE } from '../../../constants/service';
import { INVALID_VALUE } from '../../../constants/validate';
import useLine from '../../../service/hooks/useLine';
import useSection from '../../../service/hooks/useSection';
import useSectionForm from '../../../service/hooks/useSectionAddForm';
import { Line } from '../../../types';
import Button from '../../@common/Button/Button.styles';
import Container from '../../@common/Container/Container.styles';
import Modal from '../../@common/Modal/Modal';
import Title from '../../@common/Title/Title.styles';
import ValidationInput from '../../@mixins/ValidationInput/ValidationInput';
import {
  SectionSelectBox,
  ControlContainer,
  CancelButton,
} from './SectionAddModal.styles';

export interface SectionAddModalProps {
  closeModal: () => void;
}

const SectionAddModal: VFC<SectionAddModalProps> = ({ closeModal }) => {
  const { currentLineId, setCurrentLineId, addSection } = useSection();
  const {
    form,
    setDistance,
    setUpStationId,
    setDownStationId,
    isValidDistance,
    isValidForm,
    isSelectedLine,
    isSelectedUpStation,
    availableUpStations,
    availableDownStations,
    selectedSectionDistance,
  } = useSectionForm();
  const { linesQuery } = useLine();

  const onAddSection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addSection(form);

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
            {(linesQuery.data as Line[]).map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Suspense>
        </SectionSelectBox>

        <Container>
          <SectionSelectBox
            placeholder="상행역"
            value={form.upStationId}
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
            value={form.downStationId}
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

        <ValidationInput
          type="number"
          min={SERVICE.MIN_DISTANCE - 1}
          max={selectedSectionDistance - 1}
          placeholder={
            isSelectedUpStation
              ? `거리 (${selectedSectionDistance}까지)`
              : '거리'
          }
          value={form.distance}
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
