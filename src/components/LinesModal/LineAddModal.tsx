import PropTypes from 'prop-types';
import React, { ChangeEvent, FC, FormEvent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { LINE, LINE_COLORS, SECTION } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import useUpdateEffect from '../../hooks/useUpdateEffect/useUpdateEffect';
import { addLine } from '../../redux/lineSlice';
import { loadStations } from '../../redux/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isKoreanAndNumber } from '../../util/validator';
import Button from '../@common/Button/Button';
import ColorRadio from '../@common/ColorRadio/ColorRadio';
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

  useEffect(() => {
    if (errorMessage === '') {
      return;
    }

    alert(errorMessage);
  });

  const [formInput, setFormInput] = useState<FormInput>({
    name: '',
    upStationId: '',
    downStationId: '',
    distance: SECTION.MIN_DISTANCE,
    color: '',
  });
  const [validationErrorMessage, setValidationErrorMessage] = useState<ErrorMessage>({
    name: '',
    section: '',
    distance: '',
  });

  useEffect(() => {
    if (stations.length === 0) {
      dispatch(loadStations());
    }
  }, []);

  useUpdateEffect(() => {
    if (formInput.upStationId === '' || formInput.downStationId === '') {
      setValidationErrorMessage({
        ...validationErrorMessage,
        section: ERROR_MESSAGE.NONE_OF_SELECTED_SECTION,
      });
      return;
    }

    if (formInput.upStationId === formInput.downStationId) {
      setValidationErrorMessage({
        ...validationErrorMessage,
        section: ERROR_MESSAGE.DUPLICATED_SECTION,
      });
      return;
    }

    setValidationErrorMessage({
      ...validationErrorMessage,
      section: '',
    });
  }, [formInput.upStationId, formInput.downStationId]);

  const onChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value.length >= 2 && isKoreanAndNumber(value)) {
      setValidationErrorMessage({
        ...validationErrorMessage,
        name: '',
      });
    } else {
      setValidationErrorMessage({
        ...validationErrorMessage,
        name: ERROR_MESSAGE.INVALID_LINE_NAME,
      });
    }

    setFormInput({
      ...formInput,
      name: value,
    });
  };

  // TODO: 리팩터링 생각해보기
  const onChangeStations: OnChangeSectionSelectBoxHandler = (type) => ({ target: { value } }) => {
    setFormInput({
      ...formInput,
      [type]: value,
    });
  };

  const onChangeDistance = ({ target: { valueAsNumber } }: ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      distance: valueAsNumber,
    });
  };

  const isUsedLineColor = (color: string): boolean => usedLineColors.includes(color);

  const onChangeLineColor = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFormInput({ ...formInput, color: value });
  };

  const onAddLine = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      Object.values(validationErrorMessage).some((message) => message !== '') ||
      Object.values(formInput).some((value) => !value)
    ) {
      alert(ERROR_MESSAGE.INCOMPLETE_FORM);

      return;
    }

    dispatch(
      addLine({
        ...formInput,
        upStationId: Number(formInput.upStationId),
        downStationId: Number(formInput.downStationId),
      })
    );

    onClose();
  };

  return (
    <Modal titleText={LINE.ADD_MODAL_TITLE} onClose={onClose}>
      <LineForm onSubmit={onAddLine}>
        <NotificationInput
          onChange={onChangeName}
          value={formInput.name}
          message={{ text: validationErrorMessage.name, isError: true }}
          minLength={2}
          maxLength={10}
          labelText={LINE.NAME_LABEL_TEXT}
          placeholder={LINE.NAME_PLACEHOLDER}
          required
        />
        <SectionSelectBox
          onChange={onChangeStations}
          upStationOptions={stations}
          downStationOptions={stations}
          errorMessage={validationErrorMessage.section}
        />
        <NotificationInput
          value={formInput.distance}
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
              checked={color === formInput.color}
              radioColor={color}
              groupName={LINE.COLOR_SELECT_NAME}
              disabled={isUsedLineColor(color)}
              onChange={onChangeLineColor}
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
          <Button>확인</Button>
        </LineModalButtonContainer>
      </LineForm>
    </Modal>
  );
};

LineAddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LineAddModal;
