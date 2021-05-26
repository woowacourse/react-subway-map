/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { Page } from './components';
import { LoginPage, SignUpPage, StationPage, LinePage } from './pages';
import { ROUTE, SERVER_LIST } from './constants';

const SERVER_ID = 'serverId';

function App() {
  const [cookies, setCookie] = useCookies([SERVER_ID]);
  const [serverId, setServerId] = useState('');
  const endpoint = SERVER_LIST[serverId]?.endpoint || '';

  useEffect(() => {
    cookies[SERVER_ID] && setServerId(cookies[SERVER_ID]);

    return () => {
      if (serverId) {
        setCookie(SERVER_ID, serverId, { path: '/' });
      }
    };
  }, []);

  return (
    <Router>
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
        </Switch>
      </Page>
    </Router>
  );
}

export default App;
