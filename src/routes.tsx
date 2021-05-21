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
      <Route exact path={ROUTES.ROOT} component={LoginPage} />
      <Route exact path={ROUTES.SIGNUP} component={SignUpPage} />
      <Route exact path={ROUTES.STATION} component={StationPage} />
      <Route exact path={ROUTES.LINE} component={LinePage} />
      <Route exact path={ROUTES.SECTION} component={SectionPage} />
    </Switch>
  );
};

export default Routes;
