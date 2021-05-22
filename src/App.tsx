import { ContentContainer } from './components/@commons/ContentContainer/ContentContainer.styles';
import Navigation from './components/@commons/Navigation/Navigation';
import GlobalStyles from './Global.styles';
import * as S from './App.styles';
import AddStationForm from './components/StationPage/AddStationForm';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <S.App>
        <Navigation />
        <S.Container>
          <ContentContainer hatColor='MINT_500'>
            <AddStationForm />
          </ContentContainer>
        </S.Container>
      </S.App>
    </>
  );
};

export default App;
