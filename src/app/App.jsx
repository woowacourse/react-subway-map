import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PATH from "../constants/path";
import Header from "../components/Header";
import Lines from "../pages/Lines";
import Login from "../pages/Login";
import Sections from "../pages/Sections";
import Signup from "../pages/Signup";
import Stations from "../pages/Stations";

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path={[PATH.MAIN, PATH.LOGIN]}>
        <Login />
      </Route>
      <Route exact path={PATH.SIGNUP}>
        <Signup />
      </Route>
      <Route exact path={PATH.STATIONS}>
        <Stations />
      </Route>
      <Route exact path={PATH.LINES}>
        <Lines />
      </Route>
      <Route exact path={PATH.SECTIONS}>
        <Sections />
      </Route>
      <Redirect path="*" to={PATH.MAIN} />
    </Switch>
  </BrowserRouter>
);

export default App;
