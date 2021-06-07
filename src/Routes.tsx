import { Route, RouteProps, Redirect } from "react-router";

import {
  Login,
  Logout,
  Signup,
  StationManagement,
  LineManagement,
  SectionManagement,
  SubwayMap,
} from "./pages";

import { PAGE_PATH } from "./constants";

interface Props {
  isAuthenticated: boolean;
}

const Routes = ({ isAuthenticated }: Props) => {
  const PublicRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>
      {isAuthenticated ? <Redirect to={PAGE_PATH.HOME} /> : children};
    </Route>
  );

  const PrivateRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>
      {isAuthenticated ? children : <Redirect to={PAGE_PATH.LOGIN} />}
    </Route>
  );

  return (
    <>
      <PublicRoute exact path={PAGE_PATH.LOGIN}>
        <Login />
      </PublicRoute>
      <PrivateRoute exact path={PAGE_PATH.LOGOUT}>
        <Logout />
      </PrivateRoute>
      <PublicRoute exact path={PAGE_PATH.SIGN_UP}>
        <Signup />
      </PublicRoute>
      <PrivateRoute exact path={[PAGE_PATH.HOME, PAGE_PATH.STATION_MANAGEMENT]}>
        <StationManagement />
      </PrivateRoute>
      <PrivateRoute exact path={PAGE_PATH.LINE_MANAGEMENT}>
        <LineManagement />
      </PrivateRoute>
      <PrivateRoute exact path={PAGE_PATH.SECTION_MANAGEMENT}>
        <SectionManagement />
      </PrivateRoute>
      <PrivateRoute exact path={PAGE_PATH.SUBWAY_MANAGEMENT}>
        <SubwayMap />
      </PrivateRoute>
    </>
  );
};

export default Routes;
