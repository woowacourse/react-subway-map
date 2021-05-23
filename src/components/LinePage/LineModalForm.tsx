import { PALETTE, COLOR } from '../../constants/styleConstant';
import Button from '../@commons/Button/Button';
import Input from '../@commons/Input/Input';
import SelectInput from '../@commons/SelectInput/SelectInput';

import * as S from './LineModalForm.styles';

const LineModalForm = () => {
  return (
    <S.LineModalForm>
      <S.Title>노선 생성</S.Title>
      <S.InputWrapper>
        <Input label='노선 이름' />
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
        <Input label='거리' />
        <S.Message></S.Message>
      </S.InputWrapper>
      <S.PaletteContainer>
        <S.PaletteTitle>노선 색상 선택</S.PaletteTitle>
        <S.PaletteWrapper>
          {Object.values(PALETTE).map(color => (
            <S.Palette color={color} />
          ))}
          <S.SelectedPalette color={COLOR.MINT_500} />
        </S.PaletteWrapper>
      </S.PaletteContainer>
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
    </S.LineModalForm>
  );
};

export default LineModalForm;
