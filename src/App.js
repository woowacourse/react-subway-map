/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

import { loginByToken } from './redux/userSlice';
import { Page } from './components';
import { LoginPage, SignUpPage, StationPage, LinePage, SectionPage } from './pages';
import { ROUTE, SERVER_LIST, SERVER_ID, ACCESS_TOKEN } from './constants';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [cookies, setCookie] = useCookies([SERVER_ID, ACCESS_TOKEN]);

  const [serverId, setServerId] = useState(cookies[SERVER_ID] || '');
  const endpoint = SERVER_LIST[serverId]?.endpoint || '';

  useEffect(() => {
    if (!cookies[SERVER_ID]) {
      return;
    }

    if (!cookies[ACCESS_TOKEN]) {
      history.push(ROUTE.LOGIN);
      return;
    }

    dispatch(loginByToken({ endpoint, accessToken: cookies[ACCESS_TOKEN] }));

    return () => {
      if (serverId) {
        setCookie(SERVER_ID, serverId);
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
