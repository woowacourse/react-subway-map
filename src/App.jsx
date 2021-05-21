import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path={["/", "/login"]} component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
