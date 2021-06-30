import Layout from '@layout/Layout';
import PATH from 'constants/path';
import Home from 'pages/Home';
import Line from 'pages/Line';
import Login from 'pages/Login';
import Section from 'pages/Section';
import Signup from 'pages/Signup';
import Station from 'pages/Station';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Layout>
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
      </Switch>
    </Layout>
  );
};

export default App;
