/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useCookie } from './hooks';
import { loginByToken } from './redux/userSlice';
import { Page } from './components';
import { LoginPage, SignUpPage, StationPage, LinePage, SectionPage } from './pages';
import { ROUTE, SERVER_LIST } from './constants';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { accessTokenInCookie, serverIdInCookie, setServerIdInCookie } = useCookie();
  const [serverId, setServerId] = useState(serverIdInCookie || '');
  const endpoint = SERVER_LIST[serverId]?.endpoint || '';

  useEffect(() => {
    if (!serverIdInCookie) {
      return;
    }
    if (!accessTokenInCookie) {
      history.push(ROUTE.LOGIN);
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
          <LoginPage endpoint={endpoint} />
        </Route>
        <Route exact path={ROUTE.SING_UP}>
          <SignUpPage endpoint={endpoint} />
        </Route>
        <Route exact path={ROUTE.STATION}>
          <StationPage endpoint={endpoint} />
        </Route>
        <Route exact path={ROUTE.LINE}>
          <LinePage endpoint={endpoint} />
        </Route>
        <Route exact path={ROUTE.SECTION}>
          <SectionPage endpoint={endpoint} />
        </Route>
      </Switch>
    </Page>
  );
}

export default App;
