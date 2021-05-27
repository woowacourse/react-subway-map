import { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect, RouteProps } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SingupPage";
import LineManagementPage from "./pages/LineManagement/LineManagementPage";
import SectionManagementPage from "./pages/SectionManagement/SectionManagementPage";
import StationManagementPage from "./pages/StationManagement/StationManagementPage";
import SubwayMapPage from "./pages/SubwayMap/SubwayMapPage";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import { Navigation } from "./App.styles";
import { PAGE_PATH, privateNavigationLinks, publicNavigationLinks } from "./constants/route";
import useAuth from "./hooks/useAuth";
import useStation from "./hooks/useStation";
import useLine from "./hooks/useLine";

const App = () => {
  const { isAuthenticated, checkAccessToken, logout } = useAuth();
  const { getStations } = useStation();
  const { getLines } = useLine();

  useEffect(() => {
    checkAccessToken();
    getStations();
    getLines();
  }, []);

  const navigationLinks = isAuthenticated ? publicNavigationLinks : privateNavigationLinks;

  const navigationLinkList = navigationLinks.map((navigationLink) => (
    <Link to={navigationLink.link} key={navigationLink.link}>
      <Button type="button" buttonTheme="white" kind="rect">
        {navigationLink.title}
      </Button>
    </Link>
  ));

  // 역 => 로그인 => 역 => 로그인

  const PublicRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>{isAuthenticated ? <Redirect to={PAGE_PATH.HOME} /> : children};</Route>
  );

  const PrivateRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>{isAuthenticated ? children : <Redirect to={PAGE_PATH.LOGIN} />};</Route>
  );

  return (
    <BrowserRouter>
      <Header style={{ marginTop: "1.5625rem", marginBottom: "1.5625rem" }}>
        <Link to={PAGE_PATH.HOME}>🚇 지하철 노선도</Link>
      </Header>
      <Navigation>
        {navigationLinkList}
        {isAuthenticated && (
          <Link to={PAGE_PATH.LOGIN}>
            <Button type="button" onClick={logout} buttonTheme="white" kind="rect">
              ❌ 로그아웃
            </Button>
          </Link>
        )}
      </Navigation>
      <Switch>
        <PublicRoute exact path={PAGE_PATH.LOGIN}>
          <LoginPage />
        </PublicRoute>
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
      </Switch>
    </BrowserRouter>
  );
};

export default App;
