import PropTypes from 'prop-types';
import React, { FC, FormEventHandler, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LABEL_TEXT } from '../../constants/a11y';
import { LINE, LINE_COLORS, SECTION } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import useInput from '../../hooks/useInput/useInput';
import useNotificationInput from '../../hooks/useNotificationInput/useNotificationInput';
import useReadyToSubmit from '../../hooks/useReadyToSubmit/useReadyToSubmit';
import { addLine } from '../../redux/slice/lineSlice';
import { loadStations } from '../../redux/slice/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isKoreanAndNumber } from '../../util/validator';
import Button from '../@common/Button/Button';
import ColorRadio from '../@common/ColorRadio/ColorRadio';
import Input from '../@common/Input/Input';
import Modal from '../@common/Modal/Modal';
import NotificationInput from '../@common/NotificationInput/NotificationInput';
import SectionSelectBox from '../@shared/SectionSelectBox/SectionSelectBox';
import { LineColorContainer, LineForm, LineModalButtonContainer } from './LinesModal.styles';

interface Props {
  onClose: () => void;
}

const LineAddModal: FC<Props> = ({ onClose }) => {
  const { stations } = useSelector((state: RootState) => state.station);
  const { lines, errorMessage } = useSelector((state: RootState) => state.line);
  const usedLineColors = useMemo(() => lines.map((line) => line.color), [lines]);
  const dispatch = useAppDispatch();

  const isUsedLineColor = (color: string): boolean => usedLineColors.includes(color);

  const [nameInput, nameErrorMessage, onChangeName] = useNotificationInput(
    ({ setInput, setErrorMessage, targetValue }) => {
      if (targetValue.length >= 2 && isKoreanAndNumber(targetValue)) {
        setErrorMessage('');
      } else {
        setErrorMessage(ERROR_MESSAGE.INVALID_LINE_NAME);
      }

      setInput(targetValue);
    }
  );

  const [downStationIdInput, onChangeDownStationId] = useInput<HTMLSelectElement>(
    ({ setInput, targetValue }) => {
      setInput(targetValue);
    }
  );

  const [
    upStationIdInput,
    sectionErrorMessage,
    onChangeUpStationId,
  ] = useNotificationInput<HTMLSelectElement>(
    ({ setInput, setErrorMessage, targetValue }) => {
      setInput(targetValue);

      if (targetValue === '' || downStationIdInput === '') {
        setErrorMessage(ERROR_MESSAGE.NONE_OF_SELECTED_SECTION);
        return;
      }

      if (targetValue === downStationIdInput) {
        setErrorMessage(ERROR_MESSAGE.DUPLICATED_SECTION);
        return;
      }

      setErrorMessage('');
    },
    [downStationIdInput]
  );

  const [distanceInput, onChangeDistance] = useInput(({ setInput, targetValue }) => {
    setInput(targetValue);
  });

  const [colorInput, onChangeColor] = useInput(({ setInput, targetValue }) => {
    setInput(targetValue);
  });

  const isReadyToSubmit = useReadyToSubmit(
    [nameInput, upStationIdInput, downStationIdInput, distanceInput, colorInput],
    [nameErrorMessage, sectionErrorMessage]
  );

  const onAddLine: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!isReadyToSubmit) {
      alert(ERROR_MESSAGE.INCOMPLETE_FORM);

      return;
    }

    const line = {
      name: nameInput,
      upStationId: Number(upStationIdInput),
      downStationId: Number(downStationIdInput),
      distance: Number(distanceInput),
      color: colorInput,
    };

    dispatch(addLine(line));

    onClose();
  };

  //TODO: 에러메세지 리팩터링
  useEffect(() => {
    if (errorMessage === '') {
      return;
    }

    alert(errorMessage);
  });

  useEffect(() => {
    if (stations.length === 0) {
      dispatch(loadStations());
    }
  }, []);

  return (
    <Modal titleText={LABEL_TEXT.ADD_LINE} onClose={onClose}>
      <LineForm onSubmit={onAddLine}>
        <NotificationInput
          value={nameInput}
          onChange={onChangeName}
          message={{ text: nameErrorMessage, isError: true }}
          minLength={2}
          maxLength={10}
          labelText={LABEL_TEXT.LINE_NAME}
          placeholder={LABEL_TEXT.LINE_NAME}
          required
        />
        <SectionSelectBox
          onChangeUpStation={onChangeUpStationId}
          onChangeDownStation={onChangeDownStationId}
          errorMessage={sectionErrorMessage}
        />
        <Input
          value={distanceInput}
          onChange={onChangeDistance}
          type="number"
          min={SECTION.MIN_DISTANCE}
          labelText={LABEL_TEXT.DISTANCE}
          required
        />
        <LineColorContainer justifyContent="space-between" alignItems="center">
          <span>{LABEL_TEXT.LINE_COLOR}</span>
          {LINE_COLORS.map((color) => (
            <ColorRadio
              key={color}
              value={color}
              checked={color === colorInput}
              onChange={onChangeColor}
              radioColor={color}
              groupName={LINE.COLOR_SELECT_GROUP}
              disabled={isUsedLineColor(color)}
              labelText={{
                text: LABEL_TEXT.LINE_COLOR_SELECT_RADIO,
                isVisible: false,
              }}
              required
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

LineAddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LineAddModal;
