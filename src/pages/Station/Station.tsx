import { useEffect } from 'react';
import { Redirect } from 'react-router';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import AddStationForm from '../../components/StationPage/AddStationForm';
import StationListItem from '../../components/StationPage/StationListItem';
import { ROUTE } from '../../constants/constant';
import useStation from '../../hook/useStation';
import useUser from '../../hook/useUser';
import * as S from './Station.styles';

const Station = () => {
  const { stations, addStation, deleteStation, error, resetError } = useStation();
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
          {stations.map(({ id, name }) => (
            <StationListItem key={id} name={name} id={id} deleteStation={deleteStation} />
          ))}
        </S.StationList>
      </ContentContainer>
    </S.Container>
  );
};

export default Station;
