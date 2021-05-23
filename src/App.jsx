import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Lines from "./pages/Lines";
import Login from "./pages/Login";
import Sections from "./pages/Sections";
import Signup from "./pages/Signup";
import Stations from "./pages/Stations";

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path={["/", "/login"]}>
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/stations">
        <Stations />
      </Route>
      <Route exact path="/lines">
        <Lines />
      </Route>
      <Route exact path="/sections">
        <Sections />
      </Route>
      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
