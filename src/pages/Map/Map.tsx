import { useEffect, useState } from 'react';
import { mapAPI } from '../../api/map';
import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import LineList from '../../components/MapPage/LineList/LineList';
import { MapState } from '../../interfaces/map';
import * as S from './Map.styled';

const Map = () => {
  const [maps, setMaps] = useState<MapState[]>([]);

  useEffect(() => {
    const getMaps = async () => {
      const { success, data, message } = await mapAPI.map();
      if (!success) {
        window.alert(message);
        return;
      }

      setMaps(data);
    };

    getMaps();
  }, []);

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <S.Title>노선 전체 보기</S.Title>
        {maps.map(map => (
          <LineList map={map} />
        ))}
      </ContentContainer>
    </S.Container>
  );
};

export default Map;
