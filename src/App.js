import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useCookie, useRouter } from './hooks';
import { loginByToken } from './redux/userSlice';
import { Template, LoginPage, SignUpPage, StationPage, LinePage, SectionPage } from './pages';
import { ROUTE, SERVER_LIST } from './constants';

function App() {
  const dispatch = useDispatch();
  const { goToLogin } = useRouter();
  const { accessToken, serverId } = useCookie();
  const endpoint = SERVER_LIST[serverId]?.endpoint || '';

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!serverId) return;
    if (!accessToken) {
      goToLogin();
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
