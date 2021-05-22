import Input from '../@commons/Input/Input';
import * as S from './AddStationForm.styles';
import subwaySVG from '../../assets/svg/subway.svg';
import Button from '../@commons/Button/Button';

const AddStationForm = () => {
  return (
    <S.AddStationForm>
      <S.Title>지하철 역 관리</S.Title>
      <S.InputWrapper>
        <Input emoji={subwaySVG} label='지하철 역 이름을 입력해주세요.' />
        <S.ButtonWrapper>
          <Button>추가</Button>
        </S.ButtonWrapper>
      </S.InputWrapper>
      <S.Message>이미 존재하는 지하철 역 이름입니다.</S.Message>
    </S.AddStationForm>
  );
};

export default AddStationForm;
