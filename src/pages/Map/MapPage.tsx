import { VFC } from 'react';
import Template from '../../components/@common/Template/Template';
import Title from '../../components/@common/Title/Title.styles';
import DetailedLineList from '../../components/DetailedLineList/DetailedLineList';

const MapPage: VFC = () => {
  return (
    <Template type="vertical">
      <Title>전체 지도</Title>
      <DetailedLineList />
    </Template>
  );
};

export default MapPage;
