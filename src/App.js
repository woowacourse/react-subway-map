/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Page } from './components';
import { LoginPage, LogoutPage, SignUpPage, StationPage, LinePage, SectionPage } from './pages';
import { ROUTE } from './constants';

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
