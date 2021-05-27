import { useEffect, VFC } from 'react';
import useLine from '../../../hooks/useLine';
import useSection from '../../../hooks/useSection';
import { Line, LineId, Station } from '../../../types';
import Button from '../../@common/Button/Button.styles';
import Container from '../../@common/Container/Container.styles';
import Input from '../../@common/Input/Input';
import Modal from '../../@common/Modal/Modal';
import Title from '../../@common/Title/Title.styles';
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
    currentLineDetail,
    setDistance,
    setUpStationId,
    setDownStationId,
    currentLineId,
    setCurrentLineId,
  } = useSection();
  const { lines } = useLine();

  return (
    <Modal size="medium" closeModal={closeModal}>
      <Title>구간 추가</Title>
      <SectionSelectBox
        value={currentLineId}
        onChange={({ target }) => setCurrentLineId(Number(target.value))}
      >
        <option defaultValue="0">노선 선택</option>
        {!lines.isLoading &&
          (lines.data as Line[]).map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
      </SectionSelectBox>

      <Container>
        <SectionSelectBox
          value={upStationId}
          onChange={({ target }) => setUpStationId(Number(target.value))}
        >
          <option defaultValue="상행역">상행역</option>
          {(currentLineDetail.stations as Station[]).map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </SectionSelectBox>
        <SectionSelectBox
          value={downStationId}
          onChange={({ target }) => setDownStationId(Number(target.value))}
        >
          <option defaultValue="하행역">하행역</option>
          {currentLineDetail.stations.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </SectionSelectBox>
      </Container>

      <Input
        type="number"
        placeholder="거리"
        value={distance}
        onChange={({ target }) => setDistance(target.valueAsNumber)}
      />

      <ControlContainer>
        <CancelButton>취소</CancelButton>
        <Button>확인</Button>
      </ControlContainer>
    </Modal>
  );
};

export default SectionAddModal;
