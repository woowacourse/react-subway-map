import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Stations from "./pages/Stations";

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path={["/", "/login"]} component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/stations" component={Stations} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
