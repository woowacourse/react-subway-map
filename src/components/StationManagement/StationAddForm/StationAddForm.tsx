import { FormEvent, VFC } from 'react';
import useStation from '../../../hooks/useStation';
import Input from '../../@common/Input/Input';
import Title from '../../@common/Title/Title.styles';
import InputWithAlertText from '../../@mixins/InputWithAlertText/InputWithAlertText';
import {
  InputContainer,
  StyledStationAddForm,
  AddButton,
} from './StationAddForm.styles';

const StationAddForm: VFC = () => {
  const { addStation, setName, name, isValidName } = useStation();

  const handleAddStation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addStation();
  };

  return (
    <StyledStationAddForm onSubmit={handleAddStation}>
      <Title>지하철 역 관리</Title>
      <InputContainer>
        <InputWithAlertText
          value={name}
          isValid={isValidName}
          invalidText={'2글자 이상의 역 이름을 입력해주세요.'}
          onChange={({ target: { value } }) => setName(value)}
          placeholder="지하철 역 이름을 입력해주세요."
        />
        <AddButton>추가</AddButton>
      </InputContainer>
    </StyledStationAddForm>
  );
};

export default StationAddForm;
