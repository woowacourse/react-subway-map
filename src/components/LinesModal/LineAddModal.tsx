import PropTypes from 'prop-types';
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { LINE, LINE_COLORS, SECTION } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import useInput from '../../hooks/@shared/useInput/useInput';
import useNotificationInput from '../../hooks/@shared/useNotificationInput/useNotificationInput';
import useReadyToSubmit from '../../hooks/@shared/useReadyToSubmit/useReadyToSubmit';
import useUpdateEffect from '../../hooks/@shared/useUpdateEffect/useUpdateEffect';
import { addLine } from '../../redux/slice/lineSlice';
import { loadStations } from '../../redux/slice/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isKoreanAndNumber } from '../../util/validator';
import Button from '../@common/Button/Button';
import ColorRadio from '../@common/ColorRadio/ColorRadio';
import Input from '../@common/Input/Input';
import Modal from '../@common/Modal/Modal';
import NotificationInput from '../@common/NotificationInput/NotificationInput';
import SectionSelectBox, {
  OnChangeSectionSelectBoxHandler,
} from '../@shared/SectionSelectBox/SectionSelectBox';
import { LineColorContainer, LineForm, LineModalButtonContainer } from './LinesModal.styles';

interface Props {
  onClose: () => void;
}

interface FormInput {
  name: string;
  upStationId: string;
  downStationId: string;
  distance: number;
  color: string;
}

interface ErrorMessage {
  name: string;
  section: string;
  distance: string;
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
    <Modal titleText={LINE.ADD_MODAL_TITLE} onClose={onClose}>
      <LineForm onSubmit={onAddLine}>
        <NotificationInput
          value={nameInput}
          onChange={onChangeName}
          message={{ text: nameErrorMessage, isError: true }}
          minLength={2}
          maxLength={10}
          labelText={LINE.NAME_LABEL_TEXT}
          placeholder={LINE.NAME_PLACEHOLDER}
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
          labelText={LINE.DISTANCE_LABEL_TEXT}
          required
        />
        <LineColorContainer justifyContent="space-between" alignItems="center">
          <span>{LINE.COLOR_LABEL_TEXT}</span>
          {LINE_COLORS.map((color) => (
            <ColorRadio
              key={color}
              value={color}
              checked={color === colorInput}
              onChange={onChangeColor}
              radioColor={color}
              groupName={LINE.COLOR_SELECT_NAME}
              disabled={isUsedLineColor(color)}
              labelText={{
                text: '노선 색상 선택 라디오버튼',
                isVisible: false,
              }}
              required
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

LineAddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LineAddModal;
