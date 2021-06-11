import { useEffect } from 'react';
import { Redirect } from 'react-router';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import AddStationForm from '../../components/StationPage/AddStationForm';
import StationListItem from '../../components/StationPage/StationListItem';
import { ROUTE } from '../../constants/route';
import useStation from '../../hook/useStation';
import useUser from '../../hook/useUser';
import * as S from './Station.styles';

const Station = () => {
  const { stations, addStation, deleteStation, editStation, error, resetError } = useStation();
  const { accessToken } = useUser();

  useEffect(() => {
    if (error) {
      window.alert(error);
      resetError();
    }
  }, [error, resetError]);

  if (!accessToken) {
    return <Redirect to={ROUTE.SIGN_IN} />;
  }

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <AddStationForm stations={stations} addStation={addStation} />
      </ContentContainer>
      <ContentContainer>
        <S.StationList>
          {stations.map(station => (
            <StationListItem
              key={station.id}
              stations={stations}
              station={station}
              deleteStation={deleteStation}
              editStation={editStation}
            />
          ))}
        </S.StationList>
      </ContentContainer>
    </S.Container>
  );
};

export default Station;
