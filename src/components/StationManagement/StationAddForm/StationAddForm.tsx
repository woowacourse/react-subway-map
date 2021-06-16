import { FormEvent, VFC } from 'react';
import useLogin from '../../../service/hooks/useLogin';
import useStation from '../../../service/hooks/useStation';
import useStationAddForm from '../../../service/hooks/useStationAddForm';
import Title from '../../@common/Title/Title.styles';
import ValidationInput from '../../@mixins/ValidationInput/ValidationInput';
import {
  InputContainer,
  StyledStationAddForm,
  AddButton,
} from './StationAddForm.styles';

const StationAddForm: VFC = () => {
  const { accessToken } = useLogin();
  const { form, setName, isValidName } = useStationAddForm();
  const { addStation } = useStation(accessToken);

  const handleAddStation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addStation(form);
  };

  return (
    <StyledStationAddForm onSubmit={handleAddStation}>
      <Title>지하철 역 관리</Title>
      <InputContainer>
        <ValidationInput
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
