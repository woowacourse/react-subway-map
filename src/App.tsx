import { ContentContainer } from './components/@commons/ContentContainer/ContentContainer.styles';
import Navigation from './components/@commons/Navigation/Navigation';
import GlobalStyles from './Global.styles';
import * as S from './App.styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddStationForm from './components/StationPage/AddStationForm';
import { ROUTE } from './constants/constant';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Station from './pages/Station/Station';
import Line from './pages/Line/Line';
import Section from './pages/Section/Section';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <S.App>
        <BrowserRouter>
          <Navigation />
          <S.Container>
            <Switch>
              <Route exact path={ROUTE.SIGN_IN} component={SignIn} />
              <Route exact path={ROUTE.SIGN_UP} component={SignUp} />
              <Route exact path={ROUTE.STATION} component={Station} />
              <Route exact path={ROUTE.LINE} component={Line} />
              <Route exact path={ROUTE.SECTION} component={Section} />
            </Switch>
            <ContentContainer hatColor='MINT_500'>
              <AddStationForm />
            </ContentContainer>
          </S.Container>
        </BrowserRouter>
      </S.App>
    </>
  );
};

export default App;
