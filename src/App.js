import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Page } from './components';
import { ROUTE } from './constants';
import { LinePage, LoginPage, LogoutPage, SectionPage, SignUpPage, StationPage } from './pages';

const App = () => {
  return (
    <Page>
      <Switch>
        <Route exact path={ROUTE.LOGIN}>
          <LoginPage />
        </Route>
        <Route exact path={ROUTE.LOGOUT}>
          <LogoutPage />
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
};

export default App;
