import { Route, RouteProps, Redirect } from "react-router";

import LineManagementPage from "./pages/LineManagement/LineManagementPage";
import LoginPage from "./pages/Login/LoginPage";
import LogoutPage from "./pages/Logout/LogoutPage";
import SectionManagementPage from "./pages/SectionManagement/SectionManagementPage";
import SignupPage from "./pages/Signup/SignupPage";
import StationManagementPage from "./pages/StationManagement/StationManagementPage";
import SubwayMapPage from "./pages/SubwayMap/SubwayMapPage";

import { PAGE_PATH } from "./utils/constants/route";
import { RouteShape } from "./types/route";

interface Props {
  isAuthenticated: boolean;
}

const ROUTES: RouteShape[] = [
  {
    isPrivate: false,
    path: PAGE_PATH.LOGIN,
    Component: LoginPage,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.LOGOUT,
    Component: LogoutPage,
  },
  {
    isPrivate: false,
    path: PAGE_PATH.SIGN_UP,
    Component: SignupPage,
  },
  {
    isPrivate: true,
    path: [PAGE_PATH.HOME, PAGE_PATH.STATION_MANAGEMENT],
    Component: StationManagementPage,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.LINE_MANAGEMENT,
    Component: LineManagementPage,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.SECTION_MANAGEMENT,
    Component: SectionManagementPage,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.SUBWAY_MANAGEMENT,
    Component: SubwayMapPage,
  },
];

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
      {ROUTES.map(({ isPrivate, path, Component }, index) => {
        const TargetRoute = isPrivate ? PrivateRoute : PublicRoute;

        return (
          <TargetRoute key={index} exact path={path}>
            <Component />
          </TargetRoute>
        );
      })}
    </>
  );
};

export default Routes;
