import React, { FC } from 'react';
import Button from '../../components/@common/Button/Button';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Subway from '../../components/@common/Icon/Subway';
import Input from '../../components/@common/Input/Input';
import ListItem from '../../components/@common/ListItem/ListItem';
import { PAGE_INFO, THEME_COLOR } from '../../constants/appInfo';
import { DUMMY_STATIONS } from '../../constants/dummies';
import { HorizontalLine, StationForm, StationList } from './Stations.styles';

const Stations: FC = () => {
  return (
    <CardTemplate templateColor={THEME_COLOR[400]} titleText={PAGE_INFO.STATIONS.text}>
      <StationForm>
        <Input labelIcon={<Subway />} labelText="지하철 역 이름을 입력해주세요" />
        <Button>추가</Button>
      </StationForm>
      <HorizontalLine />
      {DUMMY_STATIONS && (
        <StationList>
          {DUMMY_STATIONS.map((station) => (
            <ListItem key={station.id}>{station.name}</ListItem>
          ))}
        </StationList>
      )}
    </CardTemplate>
  );
};

export default Stations;
