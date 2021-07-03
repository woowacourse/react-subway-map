import React from 'react';
import { Container } from './StationAddForm.styles';
import { Input, Button } from '../../atoms';
import { useFormContext } from '../../contexts/FormContext/FormContext';
import { isValidStationName } from '../../../utils';
import { resetForm } from '../../contexts/FormContext/reducer';

const StationAddForm = () => {
  const { state, dispatch, submitFunc } = useFormContext();

  const onAddStation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.stationName) {
      window.alert('역 이름을 입력해주세요');
      return;
    }

    const { stationName } = state;
    if (!isValidStationName(stationName.value)) {
      window.alert(
        '역 이름은 공백이 포함되지 않은 2자 이상 20자 이하의 한글/숫자로 이루어진 문자열이어야 합니다.',
      );
      return;
    }

    const body = {
      name: stationName.value,
    };

    submitFunc(body);
    dispatch(resetForm());
  };

  return (
    <Container onSubmit={onAddStation}>
      <Input name="stationName" placeholder="역 이름" minLength={2} maxLength={20} required />
      <Button>추가</Button>
    </Container>
  );
};

export default StationAddForm;
