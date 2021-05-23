import ContentContainer from '../../components/@commons/ContentContainer/ContentContainer';
import AddStationForm from '../../components/StationPage/AddStationForm';
import StationListItem from '../../components/StationPage/StationListItem';
import * as S from './Station.styles';

const Station = () => {
  return (
    <S.Container>
      <ContentContainer hatColor='MINT_500'>
        <AddStationForm />
      </ContentContainer>
      <ContentContainer>
        <S.StationList>
          <StationListItem name='아현역' />
          <StationListItem name='신촌역' />
          <StationListItem name='이대역' />
          <StationListItem name='홍대역' />
          <StationListItem name='합정역' />
        </S.StationList>
      </ContentContainer>
    </S.Container>
  );
};

export default Station;
