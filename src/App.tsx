import React, { useEffect, VFC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Subway from './components/@common/Icon/Subway';
import Header from './components/@shared/Header/Header';
import Main from './components/@shared/Main/Main';
import Navigation from './components/@shared/Navigation/Navigation';
import { API_INFO } from './constants/api';
import { APP_TITLE, COMMON_NAV_LIST, PAGE_INFO } from './constants/appInfo';
import PALETTE from './constants/palette';
import Home from './pages/Home/Home';
import Lines from './pages/Lines/Lines';
import Login from './pages/Login/Login';
import Sections from './pages/Sections/Sections';
import Signup from './pages/Signup/Signup';
import Stations from './pages/Stations/Stations';
import { RootState } from './redux/store';
import { getBearerToken } from './storage/service';
import customAxios from './util/API';

const App: VFC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  useEffect(() => {
    customAxios.defaults.baseURL = API_INFO[apiOwner].endPoint;
  }, [apiOwner]);

  useEffect(() => {
    customAxios.defaults.headers.common['Authorization'] = getBearerToken();
  }, [isLogin]);

  return (
    <>
      <Header title={APP_TITLE} logo={<Subway color={PALETTE.BLACK[400]} />}>
        <Navigation navInfoList={COMMON_NAV_LIST} />
      </Header>
      <Main>
        <Switch>
          <Route exact path={PAGE_INFO.HOME.path}>
            <Home />
          </Route>
          <Route path={PAGE_INFO.SIGN_UP.path}>
            <Signup />
          </Route>
          <Route path={PAGE_INFO.LOGIN.path}>
            <Login />
          </Route>
          <Route path={PAGE_INFO.STATIONS.path}>
            <Stations />
          </Route>
          <Route path={PAGE_INFO.LINES.path}>
            <Lines />
          </Route>
          <Route path={PAGE_INFO.SECTIONS.path}>
            <Sections />
          </Route>
        </Switch>
      </Main>
    </>
  );
};

export default App;
