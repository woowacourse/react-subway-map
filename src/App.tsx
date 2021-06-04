import Navigation from './components/@commons/Navigation/Navigation';

import * as S from './App.styles';
import { Route, Switch, useHistory } from 'react-router-dom';

import { ROUTE } from './constants/constant';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Station from './pages/Station/Station';
import Line from './pages/Line/Line';
import Section from './pages/Section/Section';
import { useEffect } from 'react';
import Home from './pages/Home/Home';
import useUser from './hook/useUser';

const routes = [
  { path: ROUTE.HOME, component: Home },
  { path: ROUTE.SIGN_IN, component: SignIn },
  { path: ROUTE.SIGN_UP, component: SignUp },
  { path: ROUTE.STATION, component: Station },
  { path: ROUTE.LINE, component: Line },
  { path: ROUTE.SECTION, component: Section },
];

const App = () => {
  const { accessToken } = useUser();
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
          {routes.map(({ path, component }) => (
            <Route exact path={path} component={component} key={path} />
          ))}
        </Switch>
      </S.Container>
    </S.App>
  );
};

export default App;
