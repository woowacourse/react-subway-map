import React from 'react';
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import LOCAL_STORAGE_KEYS from './constants/localStorageKeys';
import ROUTES from './constants/routes';
import useLocalStorage from './hooks/useLocalStorage';
import LinePage from './pages/LinePage/LinePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SectionPage from './pages/SectionPage/SectionPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import StationPage from './pages/StationPage/StationPage';

interface PrivateRouteIProps extends RouteProps {
  children?: React.ReactNode;
}

const PrivateRoute = ({ children, ...props }: PrivateRouteIProps) => {
  const [accessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  const [server] = useLocalStorage(LOCAL_STORAGE_KEYS.SERVER);

  return (
    <Route
      {...props}
      render={({ location }) =>
        accessToken && server ? (
          children
        ) : (
          <Redirect to={{ pathname: ROUTES.ROOT, state: { from: location } }} />
        )
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
    </Switch>
  );
};

export default Routes;
