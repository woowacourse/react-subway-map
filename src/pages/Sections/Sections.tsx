import React, { VFC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { requestDeleteSection } from '../../api/lines';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import FlexContainer from '../../components/@common/FlexContainer/FlexContainer';
import Add from '../../components/@common/Icon/Add';
import Subway from '../../components/@common/Icon/Subway';
import ListItem from '../../components/@common/ListItem/ListItem';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import SectionAddModal from '../../components/SectionsModal/SectionAddModal';
import { LABEL_TEXT } from '../../constants/a11y';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO } from '../../constants/appInfo';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/message';
import { Palette } from '../../constants/palette';
import useInput from '../../hooks/useInput/useInput';
import useModal from '../../hooks/useModal/useModal';
import useUpdateEffect from '../../hooks/useUpdateEffect/useUpdateEffect';
import { loadLines } from '../../redux/slice/lineSlice';
import { loadStations } from '../../redux/slice/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { Line } from '../../types';
import { StationName } from '../Stations/Stations.styles';
import { LineInfoContainer, LineSelectBox } from './Section.styles';

const Sections: VFC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { errorMessage: stationErrorMessage } = useSelector((state: RootState) => state.station);
  const { lines, errorMessage: lineErrorMessage } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();
  const sectionAddModal = useModal();

  const [targetLineIdInput, onChangeTargetLineId] = useInput<HTMLSelectElement>(
    ({ setInput, targetValue }) => {
      setInput(targetValue);
    }
  );

  const targetLine = useMemo(() => {
    const id = Number(targetLineIdInput);
    return lines.find((line) => line.id === id);
  }, [targetLineIdInput]);

  const onOpenSectionAddModal = () => {
    if (!targetLine) {
      alert(ERROR_MESSAGE.NOT_SELECTED_LINE);

      return;
    }

    sectionAddModal.openModal();
  };

  const onDeleteSection = (stationId: number) => async () => {
    if (!confirm(CONFIRM_MESSAGE.DELETE_SECTION)) {
      return;
    }

    try {
      await requestDeleteSection({
        lineId: Number(targetLineIdInput),
        stationId,
      });

      dispatch(loadLines());
    } catch (error) {
      alert(ERROR_MESSAGE.DELETE_SECTION_FAILURE);
    }
  };

  useEffect(() => {
    dispatch(loadLines());
    dispatch(loadStations());
  }, []);

  useUpdateEffect(() => {
    if (stationErrorMessage !== '') {
      alert(stationErrorMessage);

      return;
    }

    if (lineErrorMessage !== '') {
      alert(lineErrorMessage);
    }
  }, [stationErrorMessage, lineErrorMessage]);

  return (
    <CardTemplate titleText={PAGE_INFO.SECTIONS.text} templateColor={API_INFO[apiOwner].themeColor}>
      <FlexContainer>
        <LineSelectBox onChange={onChangeTargetLineId}>
          <option value="">{LABEL_TEXT.PLEASE_SELECT_LINE}</option>
          {lines.map((line) => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </LineSelectBox>
      </FlexContainer>
      {isLogin && (
        <ButtonOnLine onClick={onOpenSectionAddModal}>
          <Add width="80%" color={Palette.GRAY_600} />
        </ButtonOnLine>
      )}
      <LineInfoContainer>
        {targetLine && (
          <CardTemplate
            isColoredTitle={true}
            titleSize="sm"
            titleText={targetLine.name}
            templateColor={targetLine.color}
          >
            <ul>
              {targetLine.stations.map((station) => (
                <ListItem key={station.id} onDelete={onDeleteSection(station.id)}>
                  <Subway />
                  <StationName>{station.name}</StationName>
                </ListItem>
              ))}
            </ul>
          </CardTemplate>
        )}
      </LineInfoContainer>
      {sectionAddModal.isModalOpen && (
        <SectionAddModal line={targetLine as Line} onClose={sectionAddModal.closeModal} />
      )}
    </CardTemplate>
  );
};

export default Sections;
