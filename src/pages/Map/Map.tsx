import { useEffect, useState } from 'react';
import { mapAPI } from '../../api/map';
import { ContentContainer } from '../../components/@commons/ContentContainer/ContentContainer.styles';
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
          <div key={map.id}>
            <S.Name bgColor={map.color}>{map.name}</S.Name>
            <S.StationList>
              {map.stations.map(station => (
                <S.StationListItem key={station.id} color={map.color}>
                  <S.TransferLineList>
                    {station.transferLines.map(transferLine => (
                      <S.TransferLineListItem key={transferLine.id} bgColor={transferLine.color}>
                        {transferLine.name}
                      </S.TransferLineListItem>
                    ))}
                  </S.TransferLineList>
                  <S.StationName>{station.name}</S.StationName>
                  <S.Line bgColor={map.color}>
                    <S.StationIcon isTransfer={station.transferLines.length > 0}></S.StationIcon>
                  </S.Line>
                </S.StationListItem>
              ))}
            </S.StationList>
          </div>
        ))}
      </ContentContainer>
    </S.Container>
  );
};

export default Map;
