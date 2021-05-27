import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import FlexContainer from '../../components/@common/FlexContainer/FlexContainer';
import Add from '../../components/@common/Icon/Add';
import ListItem from '../../components/@common/ListItem/ListItem';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO } from '../../constants/appInfo';
import { DUMMY_LINES } from '../../constants/dummies';
import PALETTE from '../../constants/palette';
import { RootState } from '../../redux/store';
import { LineInfoContainer, LineSelectBox } from './Section.styles';

const Sections: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);

  return (
    <CardTemplate
      titleText={PAGE_INFO.SECTIONS.text}
      templateColor={API_INFO[apiOwner].themeColor[400]}
    >
      <FlexContainer>
        <LineSelectBox>
          {DUMMY_LINES.map((line) => (
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
        <CardTemplate
          isColoredTitle={true}
          titleSize="sm"
          titleText={DUMMY_LINES[0].name}
          templateColor={DUMMY_LINES[0].color}
        >
          <ul>
            {DUMMY_LINES[0].stations.map((station) => (
              <ListItem key={station.id} onDelete={() => console.log(station.name)}>
                {station.name}
              </ListItem>
            ))}
          </ul>
        </CardTemplate>
      </LineInfoContainer>
    </CardTemplate>
  );
};

export default Sections;
