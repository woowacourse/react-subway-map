import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTES from './constants/routes';
import LinePage from './pages/LinePage/LinePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SectionPage from './pages/SectionPage/SectionPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import StationPage from './pages/StationPage/StationPage';

const Routes = (): React.ReactElement => {
  return (
    <Switch>
      <Route exact path={ROUTES.ROOT}>
        <LoginPage />
      </Route>
      <Route exact path={ROUTES.SIGNUP}>
        <SignUpPage />
      </Route>
      <Route exact path={ROUTES.STATION}>
        <StationPage />
      </Route>
      <Route exact path={ROUTES.LINE}>
        <LinePage />
      </Route>
      <Route exact path={ROUTES.SECTION}>
        <SectionPage />
      </Route>
    </Switch>
  );
};

export default Routes;
