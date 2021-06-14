import React, { useEffect, VFC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Subway from './components/@common/Icon/Subway';
import ModalProvider from './components/@common/ModalProvider/ModalProvider';
import Header from './components/@shared/Header/Header';
import Main from './components/@shared/Main/Main';
import Navigation from './components/@shared/Navigation/Navigation';
import { APP_TITLE, COMMON_NAV_LIST, PAGE_INFO } from './constants/appInfo';
import { Palette } from './constants/palette';
import useCurrentAPIInfo from './hooks/@shared/useCurrentAPIInfo/useCurrentAPIInfo';
import FullMap from './pages/FullMap/FullMap';
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
  const APIInfo = useCurrentAPIInfo();
  const isLogin = useSelector((state: RootState) => state.login.isLogin);

  useEffect(() => {
    customAxios.defaults.baseURL = APIInfo.endPoint;
  }, [APIInfo]);

  useEffect(() => {
    customAxios.defaults.headers['Authorization'] = getBearerToken();
  }, [isLogin]);

  return (
    <>
      <Header title={APP_TITLE} logo={<Subway color={Palette.BLACK_400} />}>
        <Navigation navigatingPageInfoList={COMMON_NAV_LIST} />
      </Header>
      <Main>
        <ModalProvider>
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
            <Route path={PAGE_INFO.FULL_MAP.path}>
              <FullMap />
            </Route>
          </Switch>
        </ModalProvider>
      </Main>
    </>
  );
};

export default App;
