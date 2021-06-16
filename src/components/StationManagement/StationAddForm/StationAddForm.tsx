import { FormEvent, VFC } from 'react';
import useStation from '../../../service/hooks/useStation';
import useStationAddForm from '../../../service/hooks/useStationAddForm';
import Title from '../../@common/Title/Title.styles';
import InputWithAlertText from '../../@mixins/InputWithAlertText/InputWithAlertText';
import {
  InputContainer,
  StyledStationAddForm,
  AddButton,
} from './StationAddForm.styles';

const StationAddForm: VFC = () => {
  const { form, setName, isValidName } = useStationAddForm();
  const { addStation } = useStation();

  const handleAddStation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addStation(form);
  };

  return (
    <StyledStationAddForm onSubmit={handleAddStation}>
      <Title>지하철 역 관리</Title>
      <InputContainer>
        <InputWithAlertText
          value={form.name}
          isValid={isValidName}
          invalidText={
            '2글자 이상 20글자 이하의 한글로 된 역 이름을 입력해주세요.'
          }
          onChange={({ target: { value } }) => setName(value)}
          placeholder="지하철 역 이름을 입력해주세요."
        />
        <AddButton disabled={!isValidName}>추가</AddButton>
      </InputContainer>
    </StyledStationAddForm>
  );
};

export default StationAddForm;
