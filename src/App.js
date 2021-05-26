import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Page } from './components';
import { LoginPage, SignUpPage, StationPage, LinePage } from './pages';
import { ROUTE } from './constants';

function App() {
  const [server, setServer] = useState({ id: '', endpoint: '' });

  return (
    <Router>
      <Page server={server} setServer={setServer}>
        <Switch>
          <Route exact path={ROUTE.LOGIN}>
            <LoginPage endpoint={server.endpoint} />
          </Route>
          <Route exact path={ROUTE.SING_UP}>
            <SignUpPage endpoint={server.endpoint} />
          </Route>
          <Route exact path={ROUTE.STATION}>
            <StationPage endpoint={server.endpoint} />
          </Route>
          <Route exact path={ROUTE.LINE}>
            <LinePage endpoint={server.endpoint} />
          </Route>
        </Switch>
      </Page>
    </Router>
  );
}

export default App;
