import { useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  RouteProps,
} from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SingupPage";
import LineManagementPage from "./pages/LineManagement/LineManagementPage";
import SectionManagementPage from "./pages/SectionManagement/SectionManagementPage";
import StationManagementPage from "./pages/StationManagement/StationManagementPage";
import SubwayMapPage from "./pages/SubwayMap/SubwayMapPage";
import Header from "./components/Header/Header";
import { PAGE_PATH, ROUTES } from "./constants/route";
import useAuth from "./hooks/useAuth";
import useStation from "./hooks/useStation";
import useLine from "./hooks/useLine";
import Navigation from "./components/Navigation/Navigation";
import Logout from "./pages/Logout";

const App = () => {
  const { isAuthenticated, checkAccessToken, error: authError } = useAuth();
  const { getStations, error: stationError } = useStation();
  const { getLines, error: lineError } = useLine();

  useEffect(() => {
    checkAccessToken();
    getStations();
    getLines();
  }, []);

  useEffect(() => {
    if (authError) alert(authError.message);
  }, [authError]);

  useEffect(() => {
    if (stationError) alert(stationError.message);
  }, [stationError]);

  useEffect(() => {
    if (lineError) alert(lineError.message);
  }, [lineError]);

  const PublicRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>
      {isAuthenticated ? <Redirect to={PAGE_PATH.HOME} /> : children};
    </Route>
  );

  const PrivateRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>
      {isAuthenticated ? children : <Redirect to={PAGE_PATH.LOGIN} />};
    </Route>
  );

  return (
    <BrowserRouter>
      <Header style={{ marginTop: "1.5625rem", marginBottom: "1.5625rem" }}>
        <Link to={PAGE_PATH.HOME}>🚇 지하철 노선도</Link>
      </Header>
      <Navigation routes={ROUTES} isAuthenticated={isAuthenticated} />
      <Switch>
        <PublicRoute exact path={PAGE_PATH.LOGIN}>
          <LoginPage />
        </PublicRoute>
        <PublicRoute exact path={PAGE_PATH.SIGN_UP}>
          <SignupPage />
        </PublicRoute>
        <PrivateRoute exact path={PAGE_PATH.LOGOUT}>
          <Logout />
        </PrivateRoute>
        <PrivateRoute
          exact
          path={[PAGE_PATH.HOME, PAGE_PATH.STATION_MANAGEMENT]}
        >
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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
