import React, { VFC } from 'react';
import { requestAddSection } from '../../API/lines';
import { LABEL_TEXT } from '../../constants/a11y';
import useModal from '../../hooks/@shared/useModal/useModal';
import { loadLines } from '../../redux/slice/lineSlice';
import { useAppDispatch } from '../../redux/store';
import { Line } from '../../types';
import { SubmitFormInfoHandler } from '../@common/Form/Form';
import ResponsiveFormSubmit from '../@common/Form/ResponsiveFormSubmit/ResponsiveFormSubmit';
import Input from '../@common/Input/Input';
import ModalTemplate from '../@common/ModalTemplate/ModalTemplate';
import TransparentButton from '../@common/TransparentButton/TransparentButton';
import DistanceInput from '../@shared/DistanceInput/DistanceInput';
import { SectionInput } from '../@shared/SectionSelectBox/SectionSelectBox';
import { SectionModalButtonContainer } from '../@shared/SectionSelectBox/SectionSelectBox.styles';
import { SectionForm } from './SectionAddModal.styles';
import SectionAddModalSectionSelectBox from './SectionAddModalSelectBox';

interface Props {
  line: Line;
}

const SectionAddModal: VFC<Props> = ({ line }) => {
  const dispatch = useAppDispatch();
  const modal = useModal();

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

      modal.closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ModalTemplate titleText={LABEL_TEXT.ADD_SECTION}>
      <SectionForm onSubmitFormInfo={onSubmitAddSection}>
        <Input labelText={LABEL_TEXT.SELECTED_LINE} value={line.name} disabled={true} />
        <SectionAddModalSectionSelectBox targetLine={line} />
        <DistanceInput />

        <SectionModalButtonContainer justifyContent="flex-end">
          <TransparentButton onClick={modal.closeModal}>{LABEL_TEXT.CANCEL}</TransparentButton>
          <ResponsiveFormSubmit>{LABEL_TEXT.CONFIRM}</ResponsiveFormSubmit>
        </SectionModalButtonContainer>
      </SectionForm>
    </ModalTemplate>
  );
};

export default SectionAddModal;
