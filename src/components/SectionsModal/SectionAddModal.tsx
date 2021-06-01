import PropTypes from 'prop-types';
import React, { FC, FormEventHandler } from 'react';
import { requestAddSection } from '../../api/lines';
import { LABEL_TEXT } from '../../constants/a11y';
import { SECTION } from '../../constants/appInfo';
import { ERROR_MESSAGE } from '../../constants/message';
import useInput from '../../hooks/@shared/useInput/useInput';
import useNotificationInput from '../../hooks/@shared/useNotificationInput/useNotificationInput';
import useReadyToSubmit from '../../hooks/@shared/useReadyToSubmit/useReadyToSubmit';
import { loadLines } from '../../redux/slice/lineSlice';
import { useAppDispatch } from '../../redux/store';
import { Line } from '../../types';
import Button from '../@common/Button/Button';
import Input from '../@common/Input/Input';
import Modal from '../@common/Modal/Modal';
import SectionSelectBox from '../@shared/SectionSelectBox/SectionSelectBox';
import { SectionForm, SectionModalButtonContainer } from './SectionsModal.styles';

interface Props {
  onClose: () => void;
  line: Line;
}

const SectionAddModal: FC<Props> = ({ onClose, line }) => {
  const dispatch = useAppDispatch();

  const isStationInLine = (targetId: number) => {
    return line.stations.find((station) => station.id === targetId) ? true : false;
  };

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

      let numberOfStationAddedInLine = 0;

      if (isStationInLine(Number(targetValue))) {
        numberOfStationAddedInLine++;
      }

      if (isStationInLine(Number(downStationIdInput))) {
        numberOfStationAddedInLine++;
      }

      if (numberOfStationAddedInLine !== 1) {
        setErrorMessage(ERROR_MESSAGE.SHOULD_CONTAIN_ONE_STATION_IN_LINE);
        return;
      }

      if (targetValue === '' || downStationIdInput === '') {
        setErrorMessage(ERROR_MESSAGE.NONE_OF_SELECTED_SECTION);
        return;
      }

      setErrorMessage('');
    },
    [downStationIdInput]
  );

  const [distanceInput, onChangeDistance] = useInput(({ setInput, targetValue }) => {
    setInput(targetValue);
  });

  const isReadyToSubmit = useReadyToSubmit(
    [upStationIdInput, downStationIdInput, distanceInput],
    [sectionErrorMessage]
  );

  const onAddSection: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!isReadyToSubmit) {
      alert(ERROR_MESSAGE.INCOMPLETE_FORM);
      return;
    }

    try {
      await requestAddSection({
        lineId: line.id,
        upStationId: Number(upStationIdInput),
        downStationId: Number(downStationIdInput),
        distance: Number(distanceInput),
      });

      dispatch(loadLines());

      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal titleText={LABEL_TEXT.ADD_SECTION} onClose={onClose}>
      <SectionForm onSubmit={onAddSection}>
        <Input labelText={LABEL_TEXT.SELECTED_LINE} value={line.name} disabled={true} />
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
        />
        <SectionModalButtonContainer justifyContent="flex-end">
          <Button onClick={onClose} type="button" isColored={false}>
            {LABEL_TEXT.CANCEL}
          </Button>
          <Button disabled={!isReadyToSubmit}>{LABEL_TEXT.DISTANCE}</Button>
        </SectionModalButtonContainer>
      </SectionForm>
    </Modal>
  );
};

SectionAddModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  line: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    stations: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
  }).isRequired,
};

export default SectionAddModal;
