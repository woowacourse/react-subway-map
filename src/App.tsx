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
import { useAppDispatch, useAppSelector } from "./hooks";
import React, { useEffect } from "react";
import { checkAccessToken, logout } from "./modules/auth";
import { getStations } from "./modules/station";

// TODO : 실제로 만료되었을 때 제대로 처리 되는지 테스트

const App = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAccessToken());
    dispatch(getStations());
  }, []);

  const navigationLinks = isLogin ? publicNavigationLinks : privateNavigationLinks;

  const navigationLinkList = navigationLinks.map((navigationLink) => (
    <Link to={navigationLink.link}>
      <Button type="button" buttonTheme="white" kind="rect">
        {navigationLink.title}
      </Button>
    </Link>
  ));

  const onLogout = () => {
    dispatch(logout());
  };

  // 역 => 로그인 => 역 => 로그인

  const PublicRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>{isLogin ? <Redirect to={PAGE_PATH.HOME} /> : children};</Route>
  );

  const PrivateRoute = ({ children, ...props }: RouteProps) => (
    <Route {...props}>{isLogin ? children : <Redirect to={PAGE_PATH.LOGIN} />};</Route>
  );

  return (
    <BrowserRouter>
      <Header style={{ marginTop: "1.5625rem", marginBottom: "1.5625rem" }}>
        <Link to={PAGE_PATH.HOME}>🚇 지하철 노선도</Link>
      </Header>
      <Navigation>
        {navigationLinkList}
        {isLogin && (
          <Link to={PAGE_PATH.LOGIN}>
            <Button type="button" onClick={onLogout} buttonTheme="white" kind="rect">
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
