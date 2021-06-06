import { Route, RouteProps, Redirect } from "react-router";

import LoginPage from "./pages/Login/LoginPage";
import Logout from "./pages/Logout";
import SignupPage from "./pages/Signup/SingupPage";
import StationManagementPage from "./pages/StationManagement/StationManagementPage";
import LineManagementPage from "./pages/LineManagement/LineManagementPage";
import SectionManagementPage from "./pages/SectionManagement/SectionManagementPage";
import SubwayMapPage from "./pages/SubwayMap/SubwayMapPage";

import { PAGE_PATH } from "./constants/route";

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
        <LoginPage />
      </PublicRoute>
      <PrivateRoute exact path={PAGE_PATH.LOGOUT}>
        <Logout />
      </PrivateRoute>
      <PublicRoute exact path={PAGE_PATH.SIGN_UP}>
        <SignupPage />
      </PublicRoute>
      <PrivateRoute exact path={[PAGE_PATH.HOME, PAGE_PATH.STATION_MANAGEMENT]}>
        <StationManagementPage />
      </PrivateRoute>
      <PrivateRoute exact path={PAGE_PATH.LINE_MANAGEMENT}>
        <LineManagementPage />
      </PrivateRoute>
      <PrivateRoute exact path={PAGE_PATH.SECTION_MANAGEMENT}>
        <SectionManagementPage />
      </PrivateRoute>
      <PrivateRoute exact path={PAGE_PATH.SUBWAY_MANAGEMENT}>
        <SubwayMapPage />
      </PrivateRoute>
    </>
  );
};

export default Routes;
