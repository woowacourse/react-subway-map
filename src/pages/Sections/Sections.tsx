import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import FlexContainer from '../../components/@common/FlexContainer/FlexContainer';
import Add from '../../components/@common/Icon/Add';
import ListItem from '../../components/@common/ListItem/ListItem';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, SECTION } from '../../constants/appInfo';
import { DUMMY_LINES } from '../../constants/dummies';
import PALETTE from '../../constants/palette';
import { loadLines } from '../../redux/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { Line } from '../../types';
import { LineInfoContainer, LineSelectBox } from './Section.styles';

const Sections: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const { lines } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();
  const [targetLine, setTargetLine] = useState<Line | undefined>(undefined);

  useEffect(() => {
    if (lines.length === 0) {
      dispatch(loadLines(API_INFO[apiOwner].endPoint));
    }
  }, []);

  const onChangeTargetLine = ({ target: { value } }: ChangeEvent<HTMLSelectElement>): void => {
    const selectedId = Number(value);

    setTargetLine(lines.find((line) => line.id === selectedId));
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
      <ButtonOnLine
        onClick={() => {
          console.log('button');
        }}
      >
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
    </CardTemplate>
  );
};

export default Sections;
