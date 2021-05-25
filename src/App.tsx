import Navigation from './components/@commons/Navigation/Navigation';
import GlobalStyles from './Global.styles';
import * as S from './App.styles';
import { Route, Switch, useHistory } from 'react-router-dom';

import { ROUTE } from './constants/constant';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Station from './pages/Station/Station';
import Line from './pages/Line/Line';
import Section from './pages/Section/Section';
import Theme from './Theme';
import { useSelector } from 'react-redux';
import { RootState } from './modules';

const App = () => {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const history = useHistory();

  if (accessToken) {
    history.push(ROUTE.STATION);
  } else {
    history.push(ROUTE.SIGN_IN);
  }
  return (
    <>
      <Theme>
        <GlobalStyles />
        <S.App>
          <Navigation />
          <S.Container>
            <Switch>
              <Route exact path={ROUTE.SIGN_IN} component={SignIn} />
              <Route exact path={ROUTE.SIGN_UP} component={SignUp} />
              <Route exact path={ROUTE.STATION} component={Station} />
              <Route exact path={ROUTE.LINE} component={Line} />
              <Route exact path={ROUTE.SECTION} component={Section} />
            </Switch>
          </S.Container>
        </S.App>
      </Theme>
    </>
  );
};

export default App;
