import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import Subway from './components/@common/Icon/Subway';
import Header from './components/@shared/Header/Header';
import Main from './components/@shared/Main/Main';
import Navigation from './components/@shared/Navigation/Navigation';
import { APP_TITLE, COMMON_NAV_LIST, PAGE_INFO } from './constants/appInfo';
import PALETTE from './constants/palette';
import Lines from './pages/Lines/Lines';
import Login from './pages/Login/Login';
import Sections from './pages/Sections/Sections';
import Signup from './pages/Signup/Signup';
import Stations from './pages/Stations/Stations';

const App: FC = () => {
  return (
    <>
      <Header title={APP_TITLE} logo={<Subway color={PALETTE.BLACK[400]} />}>
        <Navigation navInfoList={COMMON_NAV_LIST} />
      </Header>
      <Main>
        <Switch>
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
