import PropTypes from 'prop-types';
import React, {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { LINE, LINE_COLORS } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import useInput from '../../hooks/@shared/useInput/useInput';
import useNotificationInput from '../../hooks/@shared/useNotificationInput/useNotificationInput';
import useReadyToSubmit from '../../hooks/@shared/useReadyToSubmit/useReadyToSubmit';
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

const LineModifyModal: FC<Props> = ({ line, onClose }) => {
  const { lines } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();
  const usedLineColor = useMemo(
    () => lines.filter((ele) => ele.id !== line.id).map((ele) => ele.color),
    [lines]
  );

  const isUsedLineColor = (color: string) => usedLineColor.includes(color);

  const [nameInput, nameErrorMessage, onChangeName, setNameInput] = useNotificationInput(
    ({ setInput, setErrorMessage, targetValue }) => {
      setInput(targetValue);

      if (targetValue.length >= 2 && isKoreanAndNumber(targetValue)) {
        setErrorMessage('');
      } else {
        setErrorMessage(ERROR_MESSAGE.INVALID_LINE_NAME);
      }
    }
  );

  const [colorInput, onChangeColor, setColorInput] = useInput(({ setInput, targetValue }) => {
    setInput(targetValue);
  });

  const isReadyToSubmit = useReadyToSubmit([nameInput, colorInput], [nameErrorMessage]);

  const onModifyLine: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!isReadyToSubmit) {
      alert(ERROR_MESSAGE.INCOMPLETE_FORM);

      return;
    }

    const lineInfo = {
      lineId: line.id,
      name: nameInput,
      color: colorInput,
    };

    dispatch(modifyLine(lineInfo));

    onClose();
  };

  useEffect(() => {
    setNameInput(line.name);
    setColorInput(line.color);
  }, []);

  return (
    <Modal titleText={LINE.MODIFY_MODAL_TITLE} onClose={onClose}>
      <LineForm onSubmit={onModifyLine}>
        <NotificationInput
          value={nameInput}
          onChange={onChangeName}
          message={{ text: nameErrorMessage, isError: true }}
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
              onChange={onChangeColor}
              checked={color === colorInput}
              radioColor={color}
              groupName={LINE.COLOR_SELECT_NAME}
              disabled={isUsedLineColor(color)}
              labelText={{
                text: '노선 색상 선택 라디오버튼',
                isVisible: false,
              }}
            />
          ))}
        </LineColorContainer>
        <LineModalButtonContainer justifyContent="flex-end">
          <Button type="button" isColored={false} onClick={onClose}>
            취소
          </Button>
          <Button disabled={!isReadyToSubmit}>확인</Button>
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
