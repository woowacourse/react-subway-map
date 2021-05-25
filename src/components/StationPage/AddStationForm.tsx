import Input from '../@commons/Input/Input';
import * as S from './AddStationForm.styles';
import subwaySVG from '../../assets/svg/subway.svg';
import Button from '../@commons/Button/Button';
import { useState } from 'react';
import { REGEXP } from '../../constants/regularExpression';
import { Station } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { addStationAsync } from '../../modules/station/stationReducer';

const getStationNameErrorMessage = (name: string, stations: Station[]) => {
  if (!(2 <= name.length && name.length <= 20)) {
    return '역 이름은 최소 2글자 이상 20글자 이하여야 합니다.';
  }

  if (!(REGEXP.KOR.test(name) || REGEXP.NUMBER.test(name))) {
    return '역 이름은 한글과 숫자만 입력할 수 있습니다.';
  }

  if (stations.some(station => station.name === name)) {
    return '이미 존재하는 역 이름입니다.';
  }

  return '';
};

const AddStationForm = () => {
  const dispatch = useDispatch();
  const [stationName, setStationName] = useState('');
  const { stations } = useSelector((state: RootState) => state.station);
  const stationNameErrorMessage = getStationNameErrorMessage(stationName, stations);
  const isValidForm = !stationNameErrorMessage;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.slice(-1)[0] === ' ') {
      return;
    }

    setStationName(e.target.value);
  };

  const handleAddStation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm) return;

    dispatch(addStationAsync({ name: stationName }));
    setStationName('');
  };

  return (
    <S.AddStationForm onSubmit={handleAddStation}>
      <S.Title>지하철 역 관리</S.Title>
      <S.InputWrapper>
        <Input
          value={stationName}
          emoji={subwaySVG}
          label='지하철 역 이름을 입력해주세요.'
          name='station'
          onChange={handleChange}
          required
        />
        <S.ButtonWrapper>
          <Button isDisabled={isValidForm ? false : true}>추가</Button>
        </S.ButtonWrapper>
      </S.InputWrapper>
      <S.Message>{stationNameErrorMessage}</S.Message>
    </S.AddStationForm>
  );
};

export default AddStationForm;
