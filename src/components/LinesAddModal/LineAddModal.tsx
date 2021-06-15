import React, { useEffect, VFC } from 'react';
import { useSelector } from 'react-redux';
import { LABEL_TEXT } from '../../constants/a11y';
import { ERROR_MESSAGE_FOR_DEVELOPER } from '../../constants/message';
import { Palette } from '../../constants/palette';
import useModal from '../../hooks/@shared/useModal/useModal';
import { addLine } from '../../redux/slice/lineSlice';
import { loadStations } from '../../redux/slice/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { isMyEnumTypeBy } from '../../util/typeGuard';
import { SubmitFormInfoHandler } from '../@common/Form/Form';
import ResponsiveFormSubmit from '../@common/Form/ResponsiveFormSubmit/ResponsiveFormSubmit';
import ModalTemplate from '../@common/ModalTemplate/ModalTemplate';
import TransparentButton from '../@common/TransparentButton/TransparentButton';
import DistanceInput from '../@shared/DistanceInput/DistanceInput';
import SectionSelectBox, { SectionInput } from '../@shared/SectionSelectBox/SectionSelectBox';
import LineColorRadio from '../LineColorRadio/LineColorRadio';
import LineNameInput from '../LineNameInput/LineNameInput';
import { LineAddForm, LineAddModalButtonContainer } from './LinesAddModal.styles';

const LineAddModal: VFC = () => {
  const { stations } = useSelector((state: RootState) => state.station);
  const dispatch = useAppDispatch();
  const modal = useModal();

  const onSubmitLineFormInfo: SubmitFormInfoHandler = (inputValues) => {
    const [name, section, distance, color] = inputValues;
    const { upStationId, downStationId } = section as SectionInput;

    if (!isMyEnumTypeBy(Palette)(color)) {
      console.error(ERROR_MESSAGE_FOR_DEVELOPER.COLOR_IS_NOT_PALETTE_TYPE);

      return;
    }

    const line = {
      name: String(name),
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      distance: Number(distance),
      color: color,
    };

    dispatch(addLine(line));

    modal.closeModal();
  };

  useEffect(() => {
    if (stations.length === 0) {
      dispatch(loadStations());
    }
  }, []);

  return (
    <ModalTemplate titleText={LABEL_TEXT.ADD_LINE}>
      <LineAddForm onSubmitFormInfo={onSubmitLineFormInfo}>
        <LineNameInput />
        <SectionSelectBox />
        <DistanceInput />
        <LineColorRadio />
        <LineAddModalButtonContainer justifyContent="flex-end">
          <TransparentButton onClick={modal.closeModal}>{LABEL_TEXT.CANCEL}</TransparentButton>
          <ResponsiveFormSubmit>{LABEL_TEXT.CONFIRM}</ResponsiveFormSubmit>
        </LineAddModalButtonContainer>
      </LineAddForm>
    </ModalTemplate>
  );
};

export default LineAddModal;
