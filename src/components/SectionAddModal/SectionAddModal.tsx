import React, { VFC } from 'react';
import { requestAddSection } from '../../API/lines';
import { LABEL_TEXT } from '../../constants/a11y';
import { loadLines } from '../../redux/slice/lineSlice';
import { useAppDispatch } from '../../redux/store';
import { Line } from '../../types';
import { SubmitFormInfoHandler } from '../@common/Form/Form';
import ResponsiveFormSubmit from '../@common/Form/ResponsiveFormSubmit/ResponsiveFormSubmit';
import Input from '../@common/Input/Input';
import Modal from '../@common/Modal/Modal';
import { SectionInput } from '../@shared/SectionSelectBox/SectionSelectBox';
import { SectionModalButtonContainer } from '../@shared/SectionSelectBox/SectionSelectBox.styles';
import DistanceInput from '../@shared/DistanceInput/DistanceInput';
import TransparentButton from '../@common/TransparentButton/TransparentButton';
import { SectionForm } from './SectionAddModal.styles';
import SectionAddModalSectionSelectBox from './SectionAddModalSelectBox';

interface Props {
  onClose: () => void;
  line: Line;
}

const SectionAddModal: VFC<Props> = ({ onClose, line }) => {
  const dispatch = useAppDispatch();

  const onSubmitAddSection: SubmitFormInfoHandler = async (inputValues) => {
    const [section, distance] = inputValues;
    const { upStationId, downStationId } = section as SectionInput;

    try {
      await requestAddSection({
        lineId: line.id,
        upStationId: Number(upStationId),
        downStationId: Number(downStationId),
        distance: Number(distance),
      });

      dispatch(loadLines());

      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal titleText={LABEL_TEXT.ADD_SECTION} onClose={onClose}>
      <SectionForm onSubmitFormInfo={onSubmitAddSection}>
        <Input labelText={LABEL_TEXT.SELECTED_LINE} value={line.name} disabled={true} />
        <SectionAddModalSectionSelectBox targetLine={line} />
        <DistanceInput />

        <SectionModalButtonContainer justifyContent="flex-end">
          <TransparentButton onClick={onClose}>{LABEL_TEXT.CANCEL}</TransparentButton>
          <ResponsiveFormSubmit>{LABEL_TEXT.CONFIRM}</ResponsiveFormSubmit>
        </SectionModalButtonContainer>
      </SectionForm>
    </Modal>
  );
};

export default SectionAddModal;
