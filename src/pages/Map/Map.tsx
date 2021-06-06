import { useEffect, useState } from 'react';
import { mapAPI } from '../../api/map';
import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
import * as S from './Map.styled';

const Map = () => {
  const [maps, setMaps] = useState({});

  useEffect(() => {
    const getMaps = async () => {
      const { success, data, message } = await mapAPI.map();
      if (!success) {
        window.alert(message);
        return;
      }

      setMaps(data.maps);
      console.log(data);
    };

    getMaps();
  }, []);

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <S.Title>노선 전체 보기</S.Title>
        {Object.values(maps).forEach(map => (
          <S.Name>{map.name}</S.Name>
        ))}
      </ContentContainer>
    </S.Container>
  );
};

export default Map;
