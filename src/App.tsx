import BaseLayout from '@layout/Layout';
import PATH from 'constants/PATH';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Station from 'pages/Station';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BaseLayout>
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
          <h1>노선 관리</h1>
        </Route>
        <Route exact path={PATH.SECTION}>
          <h1>구간 관리</h1>
        </Route>
      </Switch>
    </BaseLayout>
  );
};

export default App;
