import PropTypes from 'prop-types';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SECTION } from '../../constants/appInfo';
import useUpdateEffect from '../../hooks/useUpdateEffect/useUpdateEffect';
import { RootState } from '../../redux/store';
import { Line } from '../../types';
import Button from '../@common/Button/Button';
import Input from '../@common/Input/Input';
import Modal from '../@common/Modal/Modal';
import { ERROR_MESSAGE } from '../../constants/message';
import SectionSelectBox, {
  OnChangeSectionSelectBoxHandler,
} from '../@shared/SectionSelectBox/SectionSelectBox';
import { SectionForm, SectionModalButtonContainer } from './SectionsModal.styles';

interface Props {
  onClose: () => void;
  line: Line;
}

const SectionAddModal: FC<Props> = ({ onClose, line }) => {
  const { stations } = useSelector((state: RootState) => state.station);
  const [formInput, setFormInput] = useState({
    upStationId: '',
    downStationId: '',
    distance: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    section: '',
  });

  const isStationInLine = (targetId: number) => {
    return line.stations.find((station) => station.id === targetId) ? true : false;
  };

  useUpdateEffect(() => {
    let numberOfStationAddedInLine = 0;

    if (isStationInLine(Number(formInput.upStationId))) {
      numberOfStationAddedInLine++;
    }

    if (isStationInLine(Number(formInput.downStationId))) {
      numberOfStationAddedInLine++;
    }

    if (numberOfStationAddedInLine !== 1) {
      setErrorMessage({
        section: ERROR_MESSAGE.SHOULD_CONTAIN_ONE_STATION_IN_LINE,
      });
      return;
    }

    if (formInput.upStationId === '' || formInput.downStationId === '') {
      setErrorMessage({
        ...errorMessage,
        section: ERROR_MESSAGE.NONE_OF_SELECTED_SECTION,
      });
      return;
    }

    setErrorMessage({
      section: '',
    });
  }, [formInput.upStationId, formInput.downStationId]);

  const onChangeStations: OnChangeSectionSelectBoxHandler = (type) => ({ target: { value } }) => {
    setFormInput({
      ...formInput,
      [type]: value,
    });
  };

  return (
    <Modal titleText={SECTION.ADD_MODAL_TITLE} onClose={onClose}>
      <SectionForm>
        <Input labelText="노선선택" value={line.name} disabled={true} />
        <SectionSelectBox
          onChange={onChangeStations}
          upStationOptions={stations}
          downStationOptions={stations}
          errorMessage={errorMessage.section}
        />
        <Input type="number" min={SECTION.MIN_DISTANCE} labelText={SECTION.DISTANCE_LABEL_TEXT} />
        <SectionModalButtonContainer justifyContent="flex-end">
          <Button type="button" isColored={false}>
            취소
          </Button>
          <Button>확인</Button>
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
