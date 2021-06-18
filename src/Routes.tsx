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
import { RouteShape } from "./@types/route";

interface Props {
  isAuthenticated: boolean;
}

const ROUTES: RouteShape[] = [
  {
    isPrivate: false,
    path: PAGE_PATH.LOGIN,
    Component: Login,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.LOGOUT,
    Component: Logout,
  },
  {
    isPrivate: false,
    path: PAGE_PATH.SIGN_UP,
    Component: Signup,
  },
  {
    isPrivate: true,
    path: [PAGE_PATH.HOME, PAGE_PATH.STATION_MANAGEMENT],
    Component: StationManagement,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.LINE_MANAGEMENT,
    Component: LineManagement,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.SECTION_MANAGEMENT,
    Component: SectionManagement,
  },
  {
    isPrivate: true,
    path: PAGE_PATH.SUBWAY_MANAGEMENT,
    Component: SubwayMap,
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
