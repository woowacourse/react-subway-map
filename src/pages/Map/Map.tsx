import { useEffect } from 'react';
import { Redirect } from 'react-router';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import MapLineListItem from '../../components/MapPage/MapLineListItem';
import { ROUTE } from '../../constants/route';
import useMap from '../../hook/useMap';
import useUser from '../../hook/useUser';
import * as S from './Map.styles';

const Map = () => {
  const { mapData, error, resetError } = useMap();
  const { accessToken } = useUser();

  useEffect(() => {
    if (error) {
      alert('전체보기 정보를 불러오는데 실패하였습니다.');
      resetError();
    }
  }, [error, resetError]);

  if (!accessToken) {
    return <Redirect to={ROUTE.SIGN_IN} />;
  }

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <S.Title>전체보기</S.Title>
        <S.MapContainer>
          {mapData.map(line => (
            <MapLineListItem key={line.id} line={line} />
          ))}
        </S.MapContainer>
      </ContentContainer>
    </S.Container>
  );
};

export default Map;
