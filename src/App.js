import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useCookie, useRouter } from './hooks';
import { loginByToken } from './redux/userSlice';
import { Page } from './components';
import { LoginPage, SignUpPage, StationPage, LinePage, SectionPage } from './pages';
import { ROUTE, SERVER_LIST } from './constants';

function App() {
  const dispatch = useDispatch();
  const { goToLogin } = useRouter();
  const { accessTokenInCookie, serverIdInCookie, setServerIdInCookie } = useCookie();
  const [serverId, setServerId] = useState(serverIdInCookie || '');
  const endpoint = SERVER_LIST[serverId]?.endpoint || '';

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!serverIdInCookie) {
      return;
    }
    if (!accessTokenInCookie) {
      goToLogin();
      return;
    }
    dispatch(loginByToken({ endpoint, accessToken: accessTokenInCookie }));

    return () => {
      if (serverId) {
        setServerIdInCookie(serverId);
      }
    };
  }, []);

  return (
    <Page serverId={serverId} setServerId={setServerId}>
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
    </Page>
  );
}

export default App;
