import React, { ChangeEventHandler, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { requestDeleteSection } from '../../api/lines';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Dimmed from '../../components/@common/Dimmed/Dimmed';
import FlexContainer from '../../components/@common/FlexContainer/FlexContainer';
import Add from '../../components/@common/Icon/Add';
import Subway from '../../components/@common/Icon/Subway';
import Loading from '../../components/@common/Loading/Loading';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import ListItem from '../../components/@shared/ListItem/ListItem';
import SectionAddModal from '../../components/SectionsModal/SectionAddModal';
import { PAGE_INFO, SECTION } from '../../constants/appInfo';
import { CONFIRM_MESSAGE, ERROR_MESSAGE } from '../../constants/message';
import PALETTE from '../../constants/palette';
import useLines from '../../hooks/useLines';
import useModal from '../../hooks/useModal';
import useStations from '../../hooks/useStations';
import useThemeColor from '../../hooks/useThemeColor';
import useUpdateEffect from '../../hooks/useUpdateEffect';
import { loadLines } from '../../redux/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { Line } from '../../types';
import { StationName } from '../Stations/Stations.styles';
import { LineInfoContainer, LineSelectBox } from './Section.styles';

const Sections = (): JSX.Element => {
  const themeColor = useThemeColor();
  const isLogin = useSelector((state: RootState) => state.login.isLogin);
  const { isLoading: stationsIsLoading, errorMessage: stationErrorMessage } = useStations();
  const { lines, isLoading: linesIsLoading, errorMessage: lineErrorMessage } = useLines();
  const dispatch = useAppDispatch();

  const sectionAddModal = useModal();

  const [targetLineId, setTargetLineId] = useState('');
  const targetLine = useMemo(() => {
    const id = Number(targetLineId);
    return lines.find((line) => line.id === id);
  }, [targetLineId, lines]);

  useUpdateEffect(() => {
    if (stationErrorMessage !== '') {
      alert(stationErrorMessage);

      return;
    }

    if (lineErrorMessage !== '') {
      alert(lineErrorMessage);
    }
  }, [stationErrorMessage, lineErrorMessage]);

  const onChangeTargetLine: ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }): void => {
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

      dispatch(loadLines());
    } catch (error) {
      alert(ERROR_MESSAGE.DELETE_SECTION_FAILURE);
    }
  };

  return (
    <CardTemplate titleText={PAGE_INFO.SECTIONS.text} templateColor={themeColor[400]}>
      {stationsIsLoading && linesIsLoading && (
        <Dimmed backgroundColor="rgba(255, 255, 255, 0.2)">
          <Loading />
        </Dimmed>
      )}
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
