import Input from '../@commons/Input/Input';
import * as S from './AddLineForm.styles';
import subwaySVG from '../../assets/svg/subway.svg';
import Button from '../@commons/Button/Button';

const AddLineForm = () => {
  return (
    <S.AddLineForm>
      <S.Title>지하철 노선 관리</S.Title>
      <S.InputWrapper>
        <Input emoji={subwaySVG} label='지하철 노선 이름을 입력해주세요.' />
        <S.ButtonWrapper>
          <Button>추가</Button>
        </S.ButtonWrapper>
      </S.InputWrapper>
      <S.Message>이미 존재하는 지하철 노선 이름입니다.</S.Message>
    </S.AddLineForm>
  );
};

export default AddLineForm;
