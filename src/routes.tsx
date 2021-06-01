import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import ROUTES from './constants/routes';
import useAuth from './hooks/useAuth';
import LinePage from './pages/LinePage/LinePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RouteMapPage from './pages/RouteMapPage/RouteMapPage';
import SectionPage from './pages/SectionPage/SectionPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import StationPage from './pages/StationPage/StationPage';

interface PrivateRouteProps extends RouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({ children, ...props }: PrivateRouteProps) => {
  const { isLogin } = useAuth();

  return (
    <Route
      {...props}
      render={({ location }) =>
        isLogin ? children : <Redirect to={{ pathname: ROUTES.ROOT, state: { from: location } }} />
      }
    />
  );
};

const Routes = (): React.ReactElement => {
  return (
    <Switch>
      <Route exact path={ROUTES.ROOT}>
        <LoginPage />
      </Route>
      <Route exact path={ROUTES.SIGNUP}>
        <SignUpPage />
      </Route>
      <PrivateRoute exact path={ROUTES.STATION}>
        <StationPage />
      </PrivateRoute>
      <PrivateRoute exact path={ROUTES.LINE}>
        <LinePage />
      </PrivateRoute>
      <PrivateRoute exact path={ROUTES.SECTION}>
        <SectionPage />
      </PrivateRoute>
      <Route exact path={ROUTES.ROUTE_MAP}>
        <RouteMapPage />
      </Route>
    </Switch>
  );
};

export default Routes;
