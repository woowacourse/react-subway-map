import Navigation from './components/@commons/Navigation/Navigation';

import * as S from './App.styles';
import { Route, Switch, useHistory } from 'react-router-dom';

import { ROUTE } from './constants/api';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Station from './pages/Station/Station';
import Line from './pages/Line/Line';
import Section from './pages/Section/Section';

import { useSelector } from 'react-redux';
import { RootState } from './modules';
import { useEffect } from 'react';
import Home from './pages/Home/Home';

const App = () => {
  const { accessToken } = useSelector((state: RootState) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push(ROUTE.HOME);
    } else {
      history.push(ROUTE.SIGN_IN);
    }
  }, [accessToken, history]);

  return (
    <S.App>
      <Navigation />
      <S.Container>
        <Switch>
          <Route exact path={ROUTE.HOME} component={Home} />
          <Route exact path={ROUTE.SIGN_IN} component={SignIn} />
          <Route exact path={ROUTE.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTE.STATION} component={Station} />
          <Route exact path={ROUTE.LINE} component={Line} />
          <Route exact path={ROUTE.SECTION} component={Section} />
        </Switch>
      </S.Container>
    </S.App>
  );
};

export default App;
