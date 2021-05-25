import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Page } from './components';
import { LoginPage, SignUpPage, StationPage } from './pages';
import { ROUTE } from './constants';

function App() {
  const [server, setServer] = useState({ id: null, endpoint: null });

  return (
    <Router>
      <Page server={server} setServer={setServer}>
        <Switch>
          <Route exact path={ROUTE.LOGIN}>
            <LoginPage server={server} />
          </Route>
          <Route exact path={ROUTE.SING_UP}>
            <SignUpPage server={server} />
          </Route>
          <Route exact path={ROUTE.STATION}>
            <StationPage server={server} />
          </Route>
        </Switch>
      </Page>
    </Router>
  );
}

export default App;
