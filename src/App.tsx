import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LandingPage, StationPage, LinePage, SectionPage } from 'pages';

const App = () => {
  return (
    <>
      <h1>지그와 엘라의 지하철!</h1>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/stations" component={StationPage} />
          <Route path="/lines" component={LinePage} />
          <Route path="/sections" component={SectionPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
