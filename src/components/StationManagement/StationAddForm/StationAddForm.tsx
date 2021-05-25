import { VFC } from 'react';
import Input from '../../@common/Input/Input';
import Title from '../../@common/Title/Title.styles';
import {
  InputContainer,
  StyledStationAddForm,
  AddButton,
} from './StationAddForm.styles';

const StationAddForm: VFC = () => {
  return (
    <StyledStationAddForm onSubmit={() => {}}>
      <Title>지하철 역 관리</Title>
      <InputContainer>
        <Input placeholder="지하철 역 이름을 입력해주세요." />
        <AddButton>추가</AddButton>
      </InputContainer>
    </StyledStationAddForm>
  );
};

export default StationAddForm;
