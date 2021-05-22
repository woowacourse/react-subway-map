import Button from '../@commons/Button/Button';
import Input from '../@commons/Input/Input';
import SelectInput from '../@commons/SelectInput/SelectInput';
import * as S from './AddLineModalForm.styles';

const AddLineModalForm = () => {
  return (
    <S.AddLineModalForm>
      <S.Title>노선 생성</S.Title>
      <S.InputWrapper>
        <Input label='노선 이름' placeholder='노선 이름' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.SelectInputWrapper>
          <SelectInput initialText='상행 종점'></SelectInput>
          <S.Arrow>↔</S.Arrow>
          <SelectInput initialText='하행 종점'></SelectInput>
        </S.SelectInputWrapper>
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input label='거리' placeholder='거리' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <SelectInput initialText='노선 색상'></SelectInput>
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.ButtonWrapper>
        <Button>노선 추가하기</Button>
      </S.ButtonWrapper>
    </S.AddLineModalForm>
  );
};

export default AddLineModalForm;
