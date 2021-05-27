/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { Page } from './components';
import { LoginPage, SignUpPage, StationPage, LinePage, SectionPage } from './pages';
import { ROUTE, SERVER_LIST } from './constants';

const SERVER_ID = 'serverId';

function App() {
  const [cookies, setCookie] = useCookies([SERVER_ID]);
  const [serverId, setServerId] = useState('');
  const endpoint = SERVER_LIST[serverId]?.endpoint || '';
  const history = useHistory();

  useEffect(() => {
    if (cookies[SERVER_ID]) {
      setServerId(cookies[SERVER_ID]);
    cookies[SERVER_ID] && setServerId(cookies[SERVER_ID]);
    }

    return () => {
      if (serverId) {
        setCookie(SERVER_ID, serverId, { path: '/' });
      }
    };
  }, []);

  return (
    <Page hasStoredServerId={!!cookies[SERVER_ID]} serverId={serverId} setServerId={setServerId}>
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
        <Route exact path={ROUTE.Section}>
          <SectionPage endpoint={endpoint} />
        </Route>
      </Switch>
    </Page>
  );
}

export default App;
