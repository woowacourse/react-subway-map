import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PATH from "../constants/path";
import Header from "../components/Header";
import PrivateRoute from "../components/@shared/PrivateRoute";
import PublicRoute from "../components/@shared/PublicRoute";
import Lines from "../pages/Lines";
import Login from "../pages/Login";
import Sections from "../pages/Sections";
import Signup from "../pages/Signup";
import Stations from "../pages/Stations";
import Logout from "../pages/Logout";
import Entry from "../pages/Entry";
import Overview from "../pages/Overview";

const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Header />
    <Switch>
      <Route exact path={[PATH.MAIN, PATH.ENTRY]}>
        <Entry />
      </Route>
      <PublicRoute exact path={PATH.LOGIN} redirectTo={PATH.STATIONS}>
        <Login />
      </PublicRoute>
      <PrivateRoute exact path={PATH.LOGOUT}>
        <Logout />
      </PrivateRoute>
      <Route exact path={PATH.SIGNUP}>
        <Signup />
      </Route>
      <PrivateRoute exact path={PATH.STATIONS}>
        <Stations />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.LINES}>
        <Lines />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.SECTIONS}>
        <Sections />
      </PrivateRoute>
      <PrivateRoute exact path={PATH.OVERVIEW}>
        <Overview />
      </PrivateRoute>

      <Redirect path="*" to={PATH.ENTRY} />
    </Switch>
  </BrowserRouter>
);

export default App;
