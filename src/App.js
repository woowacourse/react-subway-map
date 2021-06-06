import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useCookies } from './hooks';
import { loginByToken } from './redux/userSlice';
import { Template, LoginPage, SignUpPage, StationPage, LinePage, SectionPage } from './pages';
import { ROUTE } from './constants';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessToken, serverId, endpoint } = useCookies();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!serverId) return;
    if (!accessToken) {
      history.push(ROUTE.LOGIN);
      return;
    }
    dispatch(loginByToken({ endpoint, accessToken }));
  }, []);

  return (
    <Template>
      <Switch>
        <Route exact path={ROUTE.LOGIN}>
          <LoginPage />
        </Route>
        <Route exact path={ROUTE.SING_UP}>
          <SignUpPage />
        </Route>
        <Route exact path={ROUTE.STATION}>
          <StationPage />
        </Route>
        <Route exact path={ROUTE.LINE}>
          <LinePage />
        </Route>
        <Route exact path={ROUTE.SECTION}>
          <SectionPage />
        </Route>
      </Switch>
    </Template>
  );
}

export default App;
