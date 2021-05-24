import BaseLayout from '@layout/Layout';
import PATH from 'constants/PATH';
import Home from 'pages/Home';
import Line from 'pages/Line';
import Login from 'pages/Login';
import Section from 'pages/Section';
import Signup from 'pages/Signup';
import Station from 'pages/Station';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
        {/* TODO: HOME 화면 변경 */}
        <Route exact path={PATH.HOME}>
          {accessToken ? <Home /> : <Login />}
        </Route>
        <Route exact path={PATH.LOGIN}>
          <Login />
        </Route>
        <Route exact path={PATH.SIGN_UP}>
          {accessToken ? <Signup /> : <Login />}
        </Route>
        <Route exact path={PATH.STATION}>
          {accessToken ? <Station /> : <Login />}
        </Route>
        <Route exact path={PATH.LINE}>
          {accessToken ? <Line /> : <Login />}
        </Route>
        <Route exact path={PATH.SECTION}>
          {accessToken ? <Section /> : <Login />}
        </Route>
      </Switch>
    </BaseLayout>
  );
};

export default App;
