import { VFC } from 'react';
import { MapTemplate } from '../../components/Map/MapTemplate/MapTemplate.styles';
import Title from '../../components/@common/Title/Title.styles';
import DetailedLineList from '../../components/Map/DetailedLineList/DetailedLineList';

const MapPage: VFC = () => {
  return (
    <MapTemplate>
      <Title>전체 지도</Title>
      <DetailedLineList />
    </MapTemplate>
  );
};

export default MapPage;
