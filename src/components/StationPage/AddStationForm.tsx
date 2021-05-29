import Input from '../@commons/Input/Input';
import * as S from './AddStationForm.styles';
import subwaySVG from '../../assets/svg/subway.svg';
import Button from '../@commons/Button/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addStationAsync } from '../../modules/station/stationReducer';
import useStation from '../../hook/useStation';
import { getStationNameErrorMessage } from './AddStationForm.validation';

const AddStationForm = () => {
  const dispatch = useDispatch();
  const [stationName, setStationName] = useState('');
  const { stations } = useStation();
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
      <S.Message>{stationName && stationNameErrorMessage}</S.Message>
    </S.AddStationForm>
  );
};

export default AddStationForm;
