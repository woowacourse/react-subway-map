import Button from '../@commons/Button/Button';
import Input from '../@commons/Input/Input';
import SelectInput from '../@commons/SelectInput/SelectInput';
import * as S from './SectionModalForm.styles';

const SectionModalForm = () => {
  return (
    <S.SectionModalForm>
      <S.Title>노선 생성</S.Title>
      <S.InputWrapper>
        <SelectInput initialText='노선을 선택해주세요' label='노선 선택'></SelectInput>
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <S.SelectInputWrapper>
          <SelectInput initialText='역을 선택해주세요' label='상행역'></SelectInput>
          <S.Arrow>↔</S.Arrow>
          <SelectInput initialText='역을 선택해주세요' label='하행역'></SelectInput>
        </S.SelectInputWrapper>
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.InputWrapper>
        <Input label='거리' placeholder='거리' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.ButtonContainer>
        <S.ButtonWrapper>
          <Button bgColor='TRANSPARENT' fontColor='BLACK'>
            취소
          </Button>
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <Button>노선 추가하기</Button>
        </S.ButtonWrapper>
      </S.ButtonContainer>
    </S.SectionModalForm>
  );
};

export default SectionModalForm;
