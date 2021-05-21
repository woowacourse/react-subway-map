import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path={["/", "/login"]} component={Login} />
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
