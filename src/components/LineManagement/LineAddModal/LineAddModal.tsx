import Button from '../../@common/Button/Button.styles';
import Modal from '../../@common/Modal/Modal';
import SelectBox from '../../@common/SelectBox/SelectBox';
import Title from '../../@common/Title/Title.styles';
import {
  StyledInput,
  StyledContainer,
  BidirectionArrowIcon,
} from './LineAddModal.styles';

const LineAddModal = () => {
  return (
    <Modal size="medium">
      <Title>노선 생성</Title>
      <StyledInput placeholder="노선 이름" />

      <StyledContainer>
        <SelectBox placeholder="상행 종점">
          <option>ddd</option>
          <option>ddd</option>
        </SelectBox>
        <BidirectionArrowIcon />
        <SelectBox placeholder="하행 종점">
          <option>ddd</option>
          <option>ddd</option>
        </SelectBox>
      </StyledContainer>

      <StyledInput placeholder="거리" type="number" />

      <StyledInput placeholder="노선 색상" />

      <Button>노선 만들기</Button>
    </Modal>
  );
};

export default LineAddModal;
