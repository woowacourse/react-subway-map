import React, { useEffect, useState } from 'react';
import * as S from './AddLineForm.styles';
import subwaySVG from '../../assets/svg/subway.svg';

import Button from '../../@commons/Button/Button';
import Input from '../../@commons/Input/Input';
import Modal from '../../@commons/Modal/Modal';

import LineModalForm from '../LineModalForm';
import { StationState } from '../../../interfaces/station';
import { AddLineAction, LineState } from '../../../interfaces/line';

import { getLineNameErrorMessage } from './addLineFormValidation';

interface Props {
  lines: LineState['lines'];
  stations: StationState['stations'];
  addLine: (newLine: AddLineAction['payload']['line']) => void;
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
      <S.Message>{lineInfo.name && lineNameErrorMessage}</S.Message>
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
