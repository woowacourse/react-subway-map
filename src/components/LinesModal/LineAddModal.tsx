import PropTypes from 'prop-types';
import React, { ChangeEvent, FC, FormEvent, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_INFO } from '../../constants/api';
import { LINE, LINE_COLORS, SECTION } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
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

interface FormValue {
  name: string;
  upStationId: string | null;
  downStationId: string | null;
  distance: number;
  color: string;
}

interface ErrorMessage {
  name: string;
  distance: string;
}

const LineAddModal: FC<Props> = ({ onClose }) => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const { stations } = useSelector((state: RootState) => state.station);
  const { lines } = useSelector((state: RootState) => state.line);
  const usedLineColors = useMemo(() => lines.map((line) => line.color), [lines]);
  const dispatch = useAppDispatch();

  const [formValue, setFormValue] = useState<FormValue>({
    name: '',
    upStationId: null,
    downStationId: null,
    distance: SECTION.MIN_DISTANCE,
    color: '',
  });
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    name: '',
    distance: '',
  });

  useEffect(() => {
    if (stations.length === 0) {
      dispatch(loadStations(API_INFO[apiOwner].endPoint));
    }
  }, []);

  const onChangeName = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (value.length >= 2 && isKoreanAndNumber(value)) {
      setErrorMessage({
        ...errorMessage,
        name: '',
      });
    } else {
      setErrorMessage({
        ...errorMessage,
        name: ERROR_MESSAGE.INVALID_LINE_NAME,
      });
    }

    setFormValue({
      ...formValue,
      name: value,
    });
  };

  // TODO: 리팩터링 생각해보기
  // TODO: 상/하행선 역 중복 막기, 이미 종점인 역도 안됨
  const onChangeStations: OnChangeSectionSelectBoxHandler = (type) => ({ target: { value } }) => {
    setFormValue({
      ...formValue,
      [type]: value,
    });
  };

  const onChangeDistance = ({ target: { valueAsNumber } }: ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      distance: valueAsNumber,
    });
  };

  const isUsedLineColor = (color: string): boolean => usedLineColors.includes(color);

  const onChangeLineColor = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, color: value });
  };

  const onAddLine = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      addLine({
        baseURL: API_INFO[apiOwner].endPoint,
        addLineRequestData: {
          ...formValue,
          upStationId: Number(formValue.upStationId),
          downStationId: Number(formValue.downStationId),
        },
      })
    );

    onClose();
  };

  return (
    <Modal titleText={LINE.ADD_MODAL_TITLE} onClose={onClose}>
      <LineForm onSubmit={onAddLine}>
        <NotificationInput
          onChange={onChangeName}
          value={formValue.name}
          message={{ text: errorMessage.name, isError: true }}
          minLength={2}
          maxLength={10}
          labelText={LINE.NAME_LABEL_TEXT}
          placeholder={LINE.NAME_PLACEHOLDER}
        />
        <SectionSelectBox
          onChange={onChangeStations}
          upStationOptions={stations}
          downStationOptions={stations}
        />
        <NotificationInput
          value={formValue.distance}
          onChange={onChangeDistance}
          type="number"
          min={SECTION.MIN_DISTANCE}
          labelText={LINE.DISTANCE_LABEL_TEXT}
        />
        <LineColorContainer justifyContent="space-between" alignItems="center">
          <span>{LINE.COLOR_LABEL_TEXT}</span>
          {LINE_COLORS.map((color) => (
            <ColorRadio
              key={color}
              value={color}
              checked={color === formValue.color}
              radioColor={color}
              groupName={LINE.COLOR_SELECT_NAME}
              disabled={isUsedLineColor(color)}
              onChange={onChangeLineColor}
            />
          ))}
        </LineColorContainer>
        <LineModalButtonContainer justifyContent="flex-end">
          <Button type="button" isColored={false}>
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
