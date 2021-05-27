import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import FlexContainer from '../../components/@common/FlexContainer/FlexContainer';
import Add from '../../components/@common/Icon/Add';
import ListItem from '../../components/@common/ListItem/ListItem';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, SECTION } from '../../constants/appInfo';
import PALETTE from '../../constants/palette';
import useModal from '../../hooks/useModal/useModal';
import { loadLines } from '../../redux/lineSlice';
import { loadStations } from '../../redux/stationSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { Line } from '../../types';
import { LineInfoContainer, LineSelectBox } from './Section.styles';
import SectionAddModal from '../../components/SectionsModal/SectionAddModal';
import { useMemo } from 'react';

const Sections: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const { lines } = useSelector((state: RootState) => state.line);
  const { stations } = useSelector((state: RootState) => state.station);
  const dispatch = useAppDispatch();

  const sectionAddModal = useModal();

  const [targetLineId, setTargetLineId] = useState('');
  const targetLine = useMemo(() => {
    const id = Number(targetLineId);
    return lines.find((line) => line.id === id);
  }, [targetLineId, lines]);

  useEffect(() => {
    if (lines.length === 0) {
      dispatch(loadLines(API_INFO[apiOwner].endPoint));
    }

    if (stations.length === 0) {
      dispatch(loadStations(API_INFO[apiOwner].endPoint));
    }
  }, []);

  const onChangeTargetLine = ({ target: { value } }: ChangeEvent<HTMLSelectElement>): void => {
    setTargetLineId(value);
  };

  const onOpenSectionAddModal = () => {
    if (!targetLine) {
      alert('노선을 선택해주세요.');

      return;
    }

    sectionAddModal.openModal();
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
      <ButtonOnLine onClick={onOpenSectionAddModal}>
        <Add width="80%" color={PALETTE.GRAY[600]} />
      </ButtonOnLine>
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
                <ListItem key={station.id} onDelete={() => console.log(station.name)}>
                  {station.name}
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
