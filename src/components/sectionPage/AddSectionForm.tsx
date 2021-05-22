import * as S from './AddSectionForm.styles';
import Button from '../@commons/Button/Button';
import SelectInput from '../@commons/SelectInput/SelectInput';

const AddSectionForm = () => {
  return (
    <S.AddSectionForm>
      <S.Title>지하철 구간 관리</S.Title>
      <S.InputWrapper>
        <SelectInput initialText='지하철 노선을 선택해주세요.'></SelectInput>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button shape='CIRCLE'>+</Button>
      </S.ButtonWrapper>
    </S.AddSectionForm>
  );
};

export default AddSectionForm;
