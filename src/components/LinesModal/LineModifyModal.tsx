import PropTypes from 'prop-types';
import React, { ChangeEvent, FC, FormEvent, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_INFO } from '../../constants/api';
import { LINE, LINE_COLORS } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import { modifyLine } from '../../redux/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isKoreanAndNumber } from '../../util/validator';
import Button from '../@common/Button/Button';
import ColorRadio from '../@common/ColorRadio/ColorRadio';
import Modal from '../@common/Modal/Modal';
import NotificationInput from '../@common/NotificationInput/NotificationInput';
import { LineColorContainer, LineForm, LineModalButtonContainer } from './LinesModal.styles';

export interface ModifyLine {
  id: number;
  name: string;
  color: string;
}

interface Props {
  line: ModifyLine;
  onClose: () => void;
}

interface FormValue {
  name: string;
  color: string;
}

const LineModifyModal: FC<Props> = ({ line, onClose }) => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const { lines } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();

  const [formInput, setFormInput] = useState<FormValue>({
    name: line.name,
    color: line.color,
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const usedLineColor = useMemo(
    () => lines.filter((ele) => ele.id !== line.id).map((ele) => ele.color),
    [lines]
  );

  const onChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value.length >= 2 && isKoreanAndNumber(value)) {
      setErrorMessage('');
    } else {
      setErrorMessage(ERROR_MESSAGE.INVALID_LINE_NAME);
    }

    setFormInput({
      ...formInput,
      name: value,
    });
  };

  const isUsedLineColor = (color: string) => usedLineColor.includes(color);

  const onChangeLineColor = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, color: value });
  };

  const onModifyLine = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      Object.values(errorMessage).some((message) => message !== '') ||
      Object.values(formInput).some((value) => !value)
    ) {
      alert(ERROR_MESSAGE.INCOMPLETE_FORM);

      return;
    }

    dispatch(
      modifyLine({
        baseURL: API_INFO[apiOwner].endPoint,
        modifyLineRequestData: { lineId: line.id, ...formInput },
      })
    );

    onClose();
  };

  return (
    <Modal titleText={LINE.MODIFY_MODAL_TITLE} onClose={onClose}>
      <LineForm onSubmit={onModifyLine}>
        <NotificationInput
          onChange={onChangeName}
          value={formInput.name}
          message={{ text: errorMessage, isError: true }}
          minLength={2}
          maxLength={10}
          labelText={LINE.NAME_LABEL_TEXT}
          placeholder={LINE.NAME_PLACEHOLDER}
        />
        <LineColorContainer justifyContent="space-between" alignItems="center">
          <span>{LINE.COLOR_LABEL_TEXT}</span>
          {LINE_COLORS.map((color) => (
            <ColorRadio
              key={color}
              value={color}
              checked={color === formInput.color}
              radioColor={color}
              groupName={LINE.COLOR_SELECT_NAME}
              disabled={isUsedLineColor(color)}
              onChange={onChangeLineColor}
            />
          ))}
        </LineColorContainer>
        <LineModalButtonContainer justifyContent="flex-end">
          <Button type="button" isColored={false} onClick={onClose}>
            취소
          </Button>
          <Button>확인</Button>
        </LineModalButtonContainer>
      </LineForm>
    </Modal>
  );
};

LineModifyModal.propTypes = {
  line: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LineModifyModal;
