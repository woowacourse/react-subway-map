import BaseLayout from '@layout/Layout';
import PATH from 'constants/PATH';
import Home from 'pages/Home';
import Line from 'pages/Line';
import Login from 'pages/Login';
import Section from 'pages/Section';
import Signup from 'pages/Signup';
import Station from 'pages/Station';
import SubwayMap from 'pages/SubwayMap';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

interface State {
  auth: {
    accessToken: string | null;
  };
}

const App = () => {
  const accessToken = useSelector<State>((state) => state.auth.accessToken);

  return (
    <BaseLayout isLogin={!!accessToken}>
      <Switch>
        <Route exact path={PATH.HOME}>
          <Home />
        </Route>
        <Route exact path={PATH.LOGIN}>
          <Login />
        </Route>
        <Route exact path={PATH.SIGN_UP}>
          <Signup />
        </Route>
        <Route exact path={PATH.STATION}>
          <Station />
        </Route>
        <Route exact path={PATH.LINE}>
          <Line />
        </Route>
        <Route exact path={PATH.SECTION}>
          <Section />
        </Route>
        <Route exact path={PATH.MAP}>
          <SubwayMap />
        </Route>
      </Switch>
    </BaseLayout>
  );
};

export default App;
