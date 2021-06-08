import PropTypes from 'prop-types';
import React, { VFC, FormEventHandler, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LABEL_TEXT } from '../../constants/a11y';
import { LINE, LINE_COLORS } from '../../constants/appInfo';
import { ERROR_MESSAGE, ERROR_MESSAGE_FOR_DEVELOPER } from '../../constants/message';
import { Palette } from '../../constants/palette';
import useInput from '../../hooks/useInput/useInput';
import useNotificationInput from '../../hooks/useNotificationInput/useNotificationInput';
import useReadyToSubmit from '../../hooks/useReadyToSubmit/useReadyToSubmit';
import { modifyLine } from '../../redux/slice/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isMyEnumTypeBy } from '../../util/typeGuard';
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

const LineModifyModal: VFC<Props> = ({ line, onClose }) => {
  const { lines } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();
  const usedLineColor = useMemo(
    () => lines.filter((ele) => ele.id !== line.id).map((ele) => ele.color),
    [lines]
  );

  const isUsedLineColor = (color: Palette) => usedLineColor.includes(color);

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

    //TODO: throw error로 바꿀 수 있을까?
    if (!isMyEnumTypeBy(Palette)(colorInput)) {
      console.error(ERROR_MESSAGE_FOR_DEVELOPER.COLOR_IS_NOT_PALETTE_TYPE);

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
    <Modal titleText={LABEL_TEXT.MODIFY_LINE} onClose={onClose}>
      <LineForm onSubmit={onModifyLine}>
        <NotificationInput
          value={nameInput}
          onChange={onChangeName}
          message={{ text: nameErrorMessage, isError: true }}
          minLength={2}
          maxLength={10}
          labelText={LABEL_TEXT.LINE_NAME}
          placeholder={LABEL_TEXT.LINE_NAME}
        />
        <LineColorContainer justifyContent="space-between" alignItems="center">
          <span>{LABEL_TEXT.LINE_COLOR}</span>
          {LINE_COLORS.map((color) => (
            <ColorRadio
              key={color}
              value={color}
              onChange={onChangeColor}
              checked={color === colorInput}
              radioColor={color}
              groupName={LINE.COLOR_SELECT_GROUP}
              disabled={isUsedLineColor(color)}
              labelText={{
                text: LABEL_TEXT.LINE_COLOR_SELECT_RADIO,
                isVisible: false,
              }}
            />
          ))}
        </LineColorContainer>
        <LineModalButtonContainer justifyContent="flex-end">
          <Button type="button" isColored={false} onClick={onClose}>
            {LABEL_TEXT.CANCEL}
          </Button>
          <Button disabled={!isReadyToSubmit}>{LABEL_TEXT.CONFIRM}</Button>
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
