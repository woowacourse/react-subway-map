import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import AddStationForm from '../../components/StationPage/AddStationForm';
import StationListItem from '../../components/StationPage/StationListItem';
import { RootState } from '../../modules';
import { getStationsAsync } from '../../modules/station/stationReducer';
import * as S from './Station.styles';

const Station = () => {
  const { stations, error } = useSelector((state: RootState) => state.station);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStationsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      window.alert(error);
    }
  }, [error]);

  return (
    <S.Container>
      <ContentContainer hasHat={true}>
        <AddStationForm />
      </ContentContainer>
      <ContentContainer>
        <S.StationList>
          {stations.map(({ id, name }) => (
            <StationListItem key={id} name={name} id={id} />
          ))}
        </S.StationList>
      </ContentContainer>
    </S.Container>
  );
};

export default Station;
