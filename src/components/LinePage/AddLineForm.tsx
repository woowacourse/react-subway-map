import Input from '../@commons/Input/Input';
import * as S from './AddLineForm.styles';
import subwaySVG from '../../assets/svg/subway.svg';
import Button from '../@commons/Button/Button';

import React, { useEffect, useState } from 'react';

import { AddLine, Line, Station } from '../../interfaces';
import { REGEXP } from '../../constants/regularExpression';
import LineModalForm from './LineModalForm';
import Modal from '../@commons/Modal/Modal';

export const getLineNameErrorMessage = (name: string, lines: Line[]) => {
  if (!(2 <= name.length && name.length <= 20)) {
    return '노선 이름은 최소 2글자 이상 20글자 이하여야 합니다.';
  }

  if (!(REGEXP.KOR.test(name) || REGEXP.NUMBER.test(name))) {
    return '노선 이름은 한글과 숫자만 입력할 수 있습니다.';
  }

  if (lines.some(line => line.name === name)) {
    return '이미 존재하는 노선 이름입니다.';
  }

  return '';
};

interface Props {
  lines: Line[];
  stations: Station[];
  addLine: (newLine: AddLine) => void;
}

const initLineInfo = {
  name: '',
  color: '',
  upStationId: '',
  downStationId: '',
  distance: '',
};

const AddLineForm = ({ lines, stations, addLine }: Props) => {
  const [lineInfo, setLineInfo] = useState(initLineInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lineNameErrorMessage = getLineNameErrorMessage(lineInfo.name, lines);
  const isValidNameForm = !lineNameErrorMessage;

  useEffect(() => {
    if (lines.length === 0) return;
    handleModalClose();
  }, [lines.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | React.MouseEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (value.slice(-1)[0] === ' ') {
      return;
    }
    setLineInfo({ ...lineInfo, [name]: value });
  };

  const handleAddNewLineName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidNameForm) return;

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setLineInfo(initLineInfo);
    setIsModalOpen(false);
  };

  const handleAddLine = (isValidForm: boolean, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidForm) return;

    addLine(lineInfo);
  };

  return (
    <S.AddLineForm onSubmit={handleAddNewLineName}>
      <S.Title>지하철 노선 관리</S.Title>
      <S.InputWrapper>
        <Input
          value={lineInfo.name}
          name='name'
          emoji={subwaySVG}
          label='지하철 노선 이름을 입력해주세요.'
          onChange={handleChange}
          required
        />
        <S.ButtonWrapper>
          <Button isDisabled={!isValidNameForm}>추가</Button>
        </S.ButtonWrapper>
      </S.InputWrapper>
      <S.Message>{lineNameErrorMessage}</S.Message>
      {isModalOpen && (
        <Modal onCloseModal={handleModalClose}>
          <LineModalForm
            lines={lines}
            lineInfo={lineInfo}
            onChange={handleChange}
            onSubmit={handleAddLine}
            stations={stations}
            onModalClose={handleModalClose}
          />
        </Modal>
      )}
    </S.AddLineForm>
  );
};

export default AddLineForm;
