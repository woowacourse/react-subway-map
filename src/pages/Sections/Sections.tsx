import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { requestDeleteSection } from '../../api/lines';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import FlexContainer from '../../components/@common/FlexContainer/FlexContainer';
import Add from '../../components/@common/Icon/Add';
import Subway from '../../components/@common/Icon/Subway';
import ListItem from '../../components/@common/ListItem/ListItem';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import SectionAddModal from '../../components/SectionsModal/SectionAddModal';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, SECTION } from '../../constants/appInfo';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/message';
import PALETTE from '../../constants/palette';
import useModal from '../../hooks/useModal/useModal';
import useUpdateEffect from '../../hooks/useUpdateEffect/useUpdateEffect';
import { loadLines } from '../../redux/lineSlice';
import { loadStations } from '../../redux/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { Line } from '../../types';
import { StationName } from '../Stations/Stations.styles';
import { LineInfoContainer, LineSelectBox } from './Section.styles';

const Sections: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { stations, errorMessage: stationErrorMessage } = useSelector(
    (state: RootState) => state.station
  );
  const { lines, errorMessage: lineErrorMessage } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();

  const sectionAddModal = useModal();

  const [targetLineId, setTargetLineId] = useState('');
  const targetLine = useMemo(() => {
    const id = Number(targetLineId);
    return lines.find((line) => line.id === id);
  }, [targetLineId, lines]);

  useEffect(() => {
    if (lines.length === 0) {
      dispatch(loadLines());
    }

    if (stations.length === 0) {
      dispatch(loadStations());
    }
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

  const onChangeTargetLine = ({ target: { value } }: ChangeEvent<HTMLSelectElement>): void => {
    setTargetLineId(value);
  };

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
        lineId: Number(targetLineId),
        stationId,
      });

      // TODO: 일관성있게 삭제 진행하기
      dispatch(loadLines());
    } catch (error) {
      alert(ERROR_MESSAGE.DELETE_SECTION_FAILURE);
    }
  };

  return (
    <CardTemplate
      titleText={PAGE_INFO.SECTIONS.text}
      templateColor={API_INFO[apiOwner].themeColor[400]}
    >
      <FlexContainer>
        <LineSelectBox onChange={onChangeTargetLine}>
          <option value="">{SECTION.LINE_SELECT_TEXT}</option>
          {lines.map((line) => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </LineSelectBox>
      </FlexContainer>
      {isLogin && (
        <ButtonOnLine onClick={onOpenSectionAddModal}>
          <Add width="80%" color={PALETTE.GRAY[600]} />
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
