import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { SECTION } from '../../constants/appInfo';
import { DUMMY_STATIONS } from '../../constants/dummies';
import Button from '../@common/Button/Button';
import Input from '../@common/Input/Input';
import Modal from '../@common/Modal/Modal';
import SectionSelectBox, {
  OnChangeSectionSelectBoxHandler,
} from '../@shared/SectionSelectBox/SectionSelectBox';
import { SectionForm, SectionModalButtonContainer } from './SectionsModal.styles';

interface Props {
  onClose: () => void;
  lineName: string;
}

const SectionsModal: FC<Props> = ({ onClose, lineName }) => {
  const onChangeStations: OnChangeSectionSelectBoxHandler = (type) => ({ target: { value } }) => {
    console.log(type, value);
  };

  return (
    <Modal titleText="구간 추가" onClose={onClose}>
      <SectionForm>
        <Input labelText="노선선택" value={lineName} disabled={true} />
        <SectionSelectBox
          onChange={onChangeStations}
          upStationOptions={DUMMY_STATIONS}
          downStationOptions={DUMMY_STATIONS}
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

SectionsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  lineName: PropTypes.string.isRequired,
};

export default SectionsModal;
