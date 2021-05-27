import useLine from '../../../hooks/useLine';
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

const SectionAddModal = () => {
  return (
    <Modal size="medium">
      <Title>구간 추가</Title>
      <SectionSelectBox>
        <option value="0">노선 선택</option>
      </SectionSelectBox>

      <Container>
        <SectionSelectBox>
          <option value="상행역">상행역</option>
        </SectionSelectBox>
        <SectionSelectBox>
          <option value="하행역">하행역</option>
        </SectionSelectBox>
      </Container>

      <Input type="number" placeholder="거리" />

      <ControlContainer>
        <CancelButton>취소</CancelButton>
        <Button>확인</Button>
      </ControlContainer>
    </Modal>
  );
};

export default SectionAddModal;
